// import React, { useEffect, useState } from 'react';
// import { Box, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// export const Sidebar = () => {
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://localhost:8000/api/nav-items')
//       .then(res => res.json())
//       .then(data => setItems(data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <Box sx={{ width: 250, bgcolor: '#fff', p: 2, height: '100vh', borderRight: '1px solid #ccc' }}>
//       <Typography fontWeight="bold" mb={1}>Hello, sign in</Typography>
//       {items.map((item) => (
//         <Box
//           key={item.id}
//           onClick={() => navigate(`/category/${item.id}`)}
//           sx={{
//             cursor: 'pointer',
//             py: 1,
//             borderBottom: '1px solid #eee',
//             '&:hover': { bgcolor: '#f1f1f1' }
//           }}
//         >
//           {item.name}
          
//         </Box>
//       ))}
//     </Box>
//   );
// };
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Collapse, IconButton } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import CloseIcon from '@mui/icons-material/Close';

// export const Sidebar = ({ navItems, onClose }) => {
//   const [itemsWithSubItems, setItemsWithSubItems] = useState([]);
//   const [openItemId, setOpenItemId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllSubItems = async () => {
    
//       if (!navItems || navItems.length === 0) {
//         setItemsWithSubItems([]);
//         return;
//       }

//       const updatedNavItems = await Promise.all(
//         navItems.map(async (item) => {
//           try {
       
//             const res = await fetch(`http://localhost:8000/api/nav-items/${item.id}/sub-items`);
//             if (!res.ok) {
//               throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             const data = await res.json();

//             const subItemsArray = data.length > 0 && data[0].sub_items ? data[0].sub_items : [];

//             return { ...item, subItems: subItemsArray };
//           } catch (err) {
//             console.error(`Failed to fetch sub-items for nav item ${item.name}:`, err);
//             return { ...item, subItems: [] }; 
//           }
//         })
//       );
//       setItemsWithSubItems(updatedNavItems);
//     };

//     fetchAllSubItems(); 
//   }, [navItems]); 
//   const handleClick = (id) => {
//     setOpenItemId(prevId => (prevId === id ? null : id));
//   };

//   const handleSubItemClick = (itemId, subItemName) => {
   
//     navigate(`/category/${itemId}/${subItemName.toLowerCase().replace(/\s+/g, '-')}`);
//     onClose(); 
//   };

//   return (
//     <Box sx={{ width: 300, bgcolor: '#fff', height: '100vh', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f0f0f0' }}>
//         <Typography fontWeight="bold">Hello, sign in</Typography>
//         <IconButton onClick={onClose} size="small">
//           <CloseIcon />
//         </IconButton>
//       </Box>
     
//       {itemsWithSubItems.map((item) => (
//         <Box key={item.id}>
//           <Box
//             onClick={() => handleClick(item.id)}
//             sx={{
//               cursor: 'pointer',
//               py: 1,
//               px: 2,
//               borderBottom: '1px solid #eee',
//               '&:hover': { bgcolor: '#f1f1f1' }
//             }}
//           >
            
//             <Typography fontWeight="bold">{item.name}</Typography>
//           </Box>
//           <Collapse in={openItemId === item.id} timeout="auto" unmountOnExit>
//             <Box sx={{ pl: 4, pt: 1, pb: 1 }}>
         
//               {item.subItems && item.subItems.map((sub, index) => (
//                 <Typography
//                   key={index}
//                   onClick={() => handleSubItemClick(item.id, sub)}
//                   sx={{
//                     cursor: 'pointer',
//                     py: 0.5,
//                     fontSize: 14,
//                     '&:hover': { color: '#007185' }
//                   }}
//                 >
//                   {sub}
//                 </Typography>
//               ))}
//             </Box>
//           </Collapse>
//         </Box>
//       ))}
//     </Box>
//   );
// };


import React, { useEffect, useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const [items, setItems] = useState([]);
  const [subItemsMap, setSubItemsMap] = useState({});
  const [openItemId, setOpenItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/nav-items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        data.forEach(item => {
          fetch(`http://localhost:8000/api/nav-items/${item.id}/sub-items`)
            .then(res => res.json())
            .then(subs => {
              const subArray = [];
              subs.forEach(sub => {
                try {
                  const parsed = JSON.parse(sub.sub_items);
                  subArray.push(...(Array.isArray(parsed) ? parsed : [parsed]));
                } catch {
                  subArray.push(sub.sub_items);
                }
              });
              setSubItemsMap(prev => ({ ...prev, [item.id]: subArray }));
            });
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleClick = (id) => {
    setOpenItemId(prev => (prev === id ? null : id));
  };

  const handleSubItemClick = (itemId, subItemName) => {
    navigate(`/category/${itemId}/${subItemName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Box sx={{ width: 250, bgcolor: '#fff', p: 2, height: '100vh', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
      <Typography fontWeight="bold" mb={2}>Hello, sign in</Typography>

      {items.map((item) => (
        <Box key={item.id}>
          <Box
            onClick={() => handleClick(item.id)}
            sx={{
              cursor: 'pointer',
              py: 1,
              borderBottom: '1px solid #eee',
              '&:hover': { bgcolor: '#f1f1f1' }
            }}
          >
            <Typography fontWeight="bold">{item.name}</Typography>
          </Box>

          <Collapse in={openItemId === item.id} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 2 }}>
              {subItemsMap[item.id]?.map((sub, i) => (
                <Typography
                  key={i}
                  onClick={() => handleSubItemClick(item.id, sub)}
                  sx={{
                    cursor: 'pointer',
                    py: 0.5,
                    fontSize: 14,
                    '&:hover': { color: '#007185' }
                  }}
                >
                  {sub}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};
