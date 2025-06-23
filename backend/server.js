const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require("bcrypt");
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "amazon",
});


con.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log(' MySQL Connected');
  }
});

// GET nav items
app.get('/api/nav-items', (req, res) => {
  con.query('SELECT * FROM nav_items', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add new nav item
app.post('/api/nav-items', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO nav_items (name) VALUES (?)';
  con.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, name });
  });
});

// Add a sub-item section with subItems array
app.post('/api/nav-items/:id/sub-items', (req, res) => {
  const { id } = req.params;
  const { name, subItems } = req.body; // subItems should be an array
  const sql = 'INSERT INTO nav_sub_items (nav_item_id, name, sub_items) VALUES (?, ?, ?)';
  con.query(sql, [id, name, JSON.stringify(subItems)], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, name, subItems });
  });
});

// Get all sub-item sections for a nav item (including subItems array)
app.get('/api/nav-items/:id/sub-items', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM nav_sub_items WHERE nav_item_id = ?';
  con.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(err);

    // Convert sub_items JSON strings to actual arrays
    const parsedResults = results.map(row => ({
      ...row,
      sub_items: row.sub_items ? JSON.parse(row.sub_items) : []
    }));

    res.json(parsedResults);
  });
});

app.post('/api/home-sections', upload.single('image'), (req, res) => {
  const { title, subtitle, type } = req.body;
  const image = req.file;

  if (!title || !type || !image) {
    return res.status(400).json({ error: 'Title, type, and image are required' });
  }

  const sql = 'INSERT INTO home_sections (title, subtitle, type, image) VALUES (?, ?, ?, ?)';
  con.query(sql, [title, subtitle || null, type, image.buffer], (err, result) => {
    if (err) {
      console.error('Insert Error:', err);
      return res.status(500).json({ error: 'Failed to insert home section' });
    }
    res.json({ message: 'Home section added successfully', id: result.insertId });
  });
});

// GET - Fetch all sections (group banners separately)
app.get('/api/home-sections', (req, res) => {
  const sql = 'SELECT * FROM home_sections';
  con.query(sql, (err, results) => {
    if (err) {
      console.error('con Fetch Error:', err);
      return res.status(500).json({ error: 'Failed to fetch home sections' });
    }

    const banners = [];
    const cards = [];

    results.forEach(row => {
      const formatted = {
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        type: row.type,
        image: row.image ? Buffer.from(row.image).toString('base64') : null
      };

      if (row.type === 'banner') banners.push(formatted);
      else cards.push(formatted);
    });

    res.json({ banners, cards });
  });
});


// DELETE: Delete by id
app.delete('/api/home-sections/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM home_sections WHERE id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Deleted successfully' });
  });
});


app.post('/api/sections', (req, res) => {
  const { title } = req.body;
  con.query('INSERT INTO card_sections (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Section added', id: result.insertId });
  });
});

// Add items to section
app.post('/api/sections/:id/items', upload.single('image'), (req, res) => {
  const sectionId = req.params.id;
  const { name, subtitle } = req.body;
  const image = req.file;

  if (!name || !image) return res.status(400).json({ error: 'Name and image required' });

  con.query(
    'INSERT INTO card_items (section_id, name, subtitle, image) VALUES (?, ?, ?, ?)',
    [sectionId, name, subtitle || '', image.buffer],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Item added', id: result.insertId });
    }
  );
});

// Get all sections with items
app.get('/api/sections', (req, res) => {
  const sectionSql = 'SELECT * FROM card_sections';
  const itemSql = 'SELECT * FROM card_items';

  con.query(sectionSql, (err, sections) => {
    if (err) return res.status(500).json({ error: err });

    con.query(itemSql, (err, items) => {
      if (err) return res.status(500).json({ error: err });

      const data = sections.map(sec => ({
        id: sec.id,
        title: sec.title,
        items: items
          .filter(item => item.section_id === sec.id)
          .map(i => ({
            id: i.id,
            name: i.name,
            subtitle: i.subtitle,
            image: i.image ? Buffer.from(i.image).toString('base64') : null
          }))
      }));

      res.json(data);
    });
  });
});

//related_items

// app.post("/api/related-items", upload.single("image"), (req, res) => {
//   const { name, product_id } = req.body;
//   const image = req.file?.buffer;

//   if (!name || !image || !product_id)
//     return res.status(400).json({ error: "Name, image, and product_id are required." });

//   const sql = "INSERT INTO related_items (name, image, product_id) VALUES (?, ?, ?)";
//   con.query(sql, [name, image, product_id], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: "Item uploaded successfully" });
//   });
// });

// app.get("/api/related-items", (req, res) => {
//   con.query("SELECT id, name, image, product_id FROM related_items", (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     const items = results.map((item) => ({
//       id: item.id,
//       name: item.name,
//       image: item.image?.toString("base64"),
//       product_id: item.product_id,
//     }));
//     res.json(items);
//   });
// });

// app.get("/api/related-items", (req, res) => {
//   con.query("SELECT id, name, image, product_id FROM related_items", (err, results) => {
//     if (err) return res.status(500).json({ error: err });

//     const items = results.map((item) => ({
//       id: item.id,
//       name: item.name,
//       image: item.image?.toString("base64"),
//       product_id: item.product_id,  // ✅ Include this
//     }));

//     res.json(items);
//   });
// });

//products_details
//product_details


app.post("/api/related-items", upload.single("image"), (req, res) => {
  const { name, product_id } = req.body;
  const image = req.file?.buffer;

  if (!name || !image || !product_id)
    return res.status(400).json({ error: "Name, image, and product_id are required." });

  const sql = "INSERT INTO related_items (name, image, product_id) VALUES (?, ?, ?)";
  con.query(sql, [name, image, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Item uploaded successfully" });
  });
});

app.get("/api/related-items", (req, res) => {
  con.query("SELECT id, name, image, product_id FROM related_items", (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const items = results.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image?.toString("base64"),
      product_id: item.product_id, 
    }));

    res.json(items);
  });
});

app.get("/api/related-items/:product_id", (req, res) => {
  const { product_id } = req.params;

  const sql = "SELECT id, name, image, product_id FROM related_items WHERE product_id = ?";

  con.query(sql, [product_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const items = results.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image?.toString("base64"),  // Convert image buffer to base64
      product_id: item.product_id
    }));

    res.json(items);
  });
});


app.post("/api/products-details", upload.single("image"), (req, res) => {
  const { name, description, price, mrp, discount, size_options, color, rating, review_count } = req.body;
  const image = req.file?.buffer;

  if (!name || !price || !image) return res.status(400).json({ error: "Missing required fields" });

  const sql = `
    INSERT INTO products_details (name, description, price, mrp, discount, image, size_options, color, rating, review_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  con.query(sql, [name, description, price, mrp, discount, image, size_options, color, rating, review_count], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Product added successfully", id: result.insertId });
  });
});

app.get("/api/products-details/:id", (req, res) => {
  const { id } = req.params;
  con.query("SELECT * FROM products_details WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });

    const product = results[0];
    res.json({
      ...product,
      image: product.image?.toString("base64")
    });
  });
});

app.get("/api/related-items/products", (req, res) => {
  const sql = `
    SELECT 
      ri.id AS related_item_id,
      ri.name AS related_name,
      ri.image AS related_image,
      ri.product_id,
      pd.name AS product_name,
      pd.description,
      pd.price,
      pd.mrp,
      pd.discount,
      pd.rating,
      pd.review_count,
      pd.size_options,
      pd.color,
      pd.image AS product_image

    FROM related_items ri
    JOIN products_details pd ON pd.id = ri.product_id
  `;

  con.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const formatted = results.map(row => ({
      related_item_id: row.related_item_id,
      related_name: row.related_name,
      related_image: row.related_image?.toString("base64"),
      product_id: row.product_id,

      product: {
        name: row.product_name,
        description: row.description,
        price: row.price,
        mrp: row.mrp,
        discount: row.discount,
        rating: row.rating,
        review_count: row.review_count,
        size_options: row.size_options,
        color: row.color,
        image: row.product_image?.toString("base64")
      }
    }));

    res.json(formatted);
  });
});


app.get("/api/related-items/:product_id", (req, res) => {
  const { product_id } = req.params;

  const sql = `
    SELECT 
      ri.id AS related_id,
      ri.name AS related_name,
      ri.image AS related_image,
      ri.product_id,

      pd.name AS product_name,
      pd.description,
      pd.price,
      pd.mrp,
      pd.discount,
      pd.rating,
      pd.review_count,
      pd.size_options,
      pd.color,
      pd.image AS product_image

    FROM related_items ri
    JOIN products_details pd ON pd.id = ri.product_id
    WHERE ri.product_id = ?
  `;

  con.query(sql, [product_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Not found" });

    const row = results[0];

    res.json({
      related_id: row.related_id,
      related_name: row.related_name,
      related_image: row.related_image?.toString("base64"),
      product_id: row.product_id,

      name: row.product_name,
      description: row.description,
      price: row.price,
      mrp: row.mrp,
      discount: row.discount,
      rating: row.rating,
      review_count: row.review_count,
      size_options: row.size_options,
      color: row.color,
      image: row.product_image?.toString("base64")
    });
  });
});


// app.get("/api/products-details/:id", (req, res) => {
//   const { id } = req.params;

//   const sql = `
//     SELECT 
//       ri.id AS related_item_id,
//       ri.name AS related_name,
//       ri.image AS related_image,
//       ri.product_id,
//       pd.name AS product_name,
//       pd.description,
//       pd.price,
//       pd.mrp,
//       pd.discount,
//       pd.image AS product_image,
//       pd.size_options,
//       pd.color,
//       pd.rating,
//       pd.review_count

//     FROM related_items ri
//     JOIN products_details pd ON pd.id = ri.product_id
//     WHERE ri.id = ?
//   `;

//   con.query(sql, [id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ message: "Related item not found" });

//     const row = results[0];

//     res.json({
//       related_item: {
//         id: row.related_item_id,
//         name: row.related_name,
//         image: row.related_image?.toString("base64"),
//         product_id: row.product_id
//       },
//       product: {
//         name: row.product_name,
//         description: row.description,
//         price: row.price,
//         mrp: row.mrp,
//         discount: row.discount,
//         image: row.product_image?.toString("base64"),
//         size_options: row.size_options,
//         color: row.color,
//         rating: row.rating,
//         review_count: row.review_count
//       }
//     });
//   });
// });



//additional items




app.post("/api/additional-items", upload.single("image"), (req, res) => {
  const { name } = req.body;
  const image = req.file?.buffer;

  if (!name || !image) return res.status(400).json({ error: "Name and image are required." });

  const sql = "INSERT INTO additional_items (name, image) VALUES (?, ?)";
  con.query(sql, [name, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Item uploaded successfully" });
  });
});

app.get("/api/additional-items", (req, res) => {
  con.query("SELECT id, name, image FROM additional_items", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const items = results.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image?.toString("base64"),
    }));
    res.json(items);
  });
});


// //  Add Section
app.post("/api/add-section", (req, res) => {
  const { title } = req.body;
  con.query("INSERT INTO shopping_sections (title) VALUES (?)", [title], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Section created successfully" });
  });
});

app.get("/api/add-section", (req, res) => {
  const query = "SELECT * FROM shopping_sections";
  con.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ sections: results });
  });
});

app.get("/api/products/:section_id", (req, res) => {
  const { section_id } = req.params;
  const query = `
    SELECT id, name, price, mrp, TO_BASE64(main_image) AS image
    FROM home_products WHERE section_id = ?
  `;
  con.query(query, [section_id], (err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ products });
  });
});


// Add Product
app.post("/api/add-product", upload.single("main_image"), (req, res) => {
  const { section_id, name, price, mrp } = req.body;
  const image = req.file?.buffer;

  if (!image) return res.status(400).json({ error: "Main image is required" });

  con.query(
    "INSERT INTO home_products (section_id, name, price, mrp, main_image) VALUES (?, ?, ?, ?, ?)",
    [section_id, name, price, mrp, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ product_id: result.insertId });
    }
  );
});

// Add Thumbnail
app.post("/api/add-thumbnail", upload.single("image"), (req, res) => {
  const { product_id } = req.body;
  const thumb = req.file?.buffer;

  if (!thumb) return res.status(400).json({ error: "Thumbnail image is required" });

  con.query(
    "INSERT INTO product_thumbnails (product_id, image) VALUES (?, ?)",
    [product_id, thumb],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Thumbnail added" });
    }
  );
});

app.get("/api/thumbnails/:product_id", (req, res) => {
  const { product_id } = req.params;
  const query = `
    SELECT TO_BASE64(image) AS image
    FROM product_thumbnails
    WHERE product_id = ?
  `;
  con.query(query, [product_id], (err, thumbs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ thumbnails: thumbs });
  });
});



app.get("/api/shopping-home-section", (req, res) => {
  const sectionQuery = "SELECT * FROM shopping_sections";

  con.query(sectionQuery, async (err, sections) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const fullData = await Promise.all(
        sections.map((section) => {
          return new Promise((resolve, reject) => {
            const productQuery = `
              SELECT id, name, price, mrp, TO_BASE64(main_image) AS image
              FROM home_products WHERE section_id = ?
            `;

            con.query(productQuery, [section.id], async (err, products) => {
              if (err) return reject(err);

              const productWithThumbs = await Promise.all(
                products.map((product) => {
                  return new Promise((res2, rej2) => {
                    const thumbQuery = `
                      SELECT TO_BASE64(image) AS image FROM product_thumbnails WHERE product_id = ?
                    `;
                    con.query(thumbQuery, [product.id], (err, thumbs) => {
                      if (err) return rej2(err);
                      res2({ ...product, thumbnails: thumbs });
                    });
                  });
                })
              );

              resolve({ ...section, products: productWithThumbs });
            });
          });
        })
      );

      // ✅ Return the data in correct format
      res.json({ sections: fullData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});


//Launchpad items

app.post("/api/launchpad-items", upload.single("image"), (req, res) => {
  const { name } = req.body;
  const image = req.file?.buffer;

  if (!name || !image) return res.status(400).json({ error: "Name and image are required." });

  const sql = "INSERT INTO Launchpad_items (name, image) VALUES (?, ?)";
  con.query(sql, [name, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Item uploaded successfully" });
  });
});

// Get API
app.get("/api/launchpad-items", (req, res) => {
  con.query("SELECT id, name, image FROM Launchpad_items", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const items = results.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image?.toString("base64"),
    }));
    res.json(items);
  });
});


//viewed sections

app.post("/api/viewed-section", (req, res) => {
  const { title } = req.body;
  con.query(
    "INSERT INTO viewed_related_items (title) VALUES (?)",
    [title],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Section created successfully" });
    }
  );
});

app.post("/api/add-view-related-product", upload.single("image"), (req, res) => {
  const {
    section_id,
    name,
    price,
    mrp,
    rating,
    bought_count,
    delivery_date,
    badge,
  } = req.body;
  const image = req.file?.buffer;

  if (!image) return res.status(400).json({ error: "Image is required" });

  con.query(
    `INSERT INTO viewed_related_products 
     (section_id, name, price, mrp, rating, bought_count, delivery_date, badge, image) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      section_id,
      name,
      price,
      mrp,
      rating,
      bought_count,
      delivery_date,
      badge,
      image,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Product added", product_id: result.insertId });
    }
  );
});

app.get("/api/view-related-product", (req, res) => {
  con.query("SELECT * FROM viewed_related_items", async (err, sections) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const result = await Promise.all(
        sections.map((section) => {
          return new Promise((resolve, reject) => {
            con.query(
              `SELECT id, name, price, mrp, rating, bought_count, delivery_date, badge,
               TO_BASE64(image) AS image 
               FROM viewed_related_products WHERE section_id = ?`,
              [section.id],
              (err, products) => {
                if (err) return reject(err);
                resolve({ ...section, products });
              }
            );
          });
        })
      );

      res.json({ sections: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

//register
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  con.query(sql, [email, password], (err, result) => {
    if (err?.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Email already registered" });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User registered", user: { id: result.insertId, email } });
  });
});

// GET register for testing via Postman
app.get("/api/register", (req, res) => {
  const { email, password } = req.query;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  con.query(sql, [email, password], (err, result) => {
    if (err?.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Email already registered" });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "User registered", user: { id: result.insertId, email } });
  });
});


//login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  con.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length || results[0].password !== password)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    delete user.password;
    res.json({ message: "Login successful", user });
  });
});

app.get("/api/login", (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT id, email, password FROM users WHERE email = ?";
  con.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Remove password before sending user object
    delete user.password;
    res.json({ message: "Login successful", user });
  });
});

//cart
// app.post("/api/cart", (req, res) => {
//   const { user_id, product_name, price, image } = req.body;

//   if (!user_id || !product_name || !price || !image)
//     return res.status(400).json({ error: "Missing fields" });

//   con.query(
//     "SELECT * FROM cart_items WHERE user_id = ? AND product_name = ?",
//     [user_id, product_name],
//     (err, rows) => {
//       if (err) return res.status(500).json({ error: err.message });

//       if (rows.length) {
//         // Update quantity if item exists
//         con.query(
//           "UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?",
//           [rows[0].id],
//           err => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ message: "Quantity updated" });
//           }
//         );
//       } else {
//         // Insert new item with image
//         const sql = "INSERT INTO cart_items (user_id, product_name, price, image) VALUES (?, ?, ?, ?)";
//         con.query(sql, [user_id, product_name, price, image], err => {
//           if (err) return res.status(500).json({ error: err.message });
//           res.json({ message: "Item added" });
//         });
//       }
//     }
//   );
// });

// app.get("/api/cart/:userId", (req, res) => {
//   const { userId } = req.params;
//   con.query("SELECT * FROM cart_items WHERE user_id = ?", [userId], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results); // ✅ includes image now
//   });
// });


// app.delete("/api/cart/:itemId", (req, res) => {
//   con.query("DELETE FROM cart_items WHERE id = ?", [req.params.itemId], (err) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: "Item removed" });
//   });
// });
// Add to Cart - insert or update quantity

// Add to Cart
// Add to Cart
app.post("/api/cart", (req, res) => {
  const { user_id, product_name, price, image } = req.body;

  if (!user_id || !product_name || !price || !image)
    return res.status(400).json({ error: "Missing fields" });

  con.query(
    "SELECT * FROM cart_items WHERE user_id = ? AND product_name = ?",
    [user_id, product_name],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      if (rows.length) {
        con.query(
          "UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?",
          [rows[0].id],
          err => {
            if (err) return res.status(500).json({ error: err.message });

            con.query("SELECT * FROM cart_items WHERE user_id = ?", [user_id], (err, results) => {
              if (err) return res.status(500).json({ error: err.message });
              res.json(results);
            });
          }
        );
      } else {
        con.query(
          "INSERT INTO cart_items (user_id, product_name, price, image, quantity) VALUES (?, ?, ?, ?, 1)",
          [user_id, product_name, price, image],
          err => {
            if (err) return res.status(500).json({ error: err.message });

            con.query("SELECT * FROM cart_items WHERE user_id = ?", [user_id], (err, results) => {
              if (err) return res.status(500).json({ error: err.message });
              res.json(results);
            });
          }
        );
      }
    }
  );
});

// Update Quantity
app.put("/api/cart/update-quantity", (req, res) => {
  const { user_id, item_id, quantity } = req.body;

  if (!user_id || !item_id || quantity == null) {
    return res.status(400).json({ error: "Missing fields" });
  }

  con.query(
    "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND id = ?",
    [quantity, user_id, item_id],
    err => {
      if (err) return res.status(500).json({ error: err.message });

      con.query("SELECT * FROM cart_items WHERE user_id = ?", [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
      });
    }
  );
});

// Delete item
app.delete("/api/cart/:userId/:itemId", (req, res) => {
  const { userId, itemId } = req.params;

  con.query(
    "DELETE FROM cart_items WHERE user_id = ? AND id = ?",
    [userId, itemId],
    err => {
      if (err) return res.status(500).json({ error: err.message });

      con.query("SELECT * FROM cart_items WHERE user_id = ?", [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
      });
    }
  );
});



const port = 8000;
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});







