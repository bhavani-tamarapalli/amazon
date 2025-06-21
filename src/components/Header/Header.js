

// import React, { useEffect, useState, useRef } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem,
//   Select, Box, Badge, Avatar, Button, Divider, Stack, Paper
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AmazonLogo from '../../assets/images/amazonlogo.png';

// export const Header = () => {
//   const [navItems, setNavItems] = useState([]);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const hoverTimeout = useRef(null);

//   useEffect(() => {
//     fetch('http://localhost:8000/api/nav-items')
//       .then((res) => res.json())
//       .then((data) => setNavItems(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleMouseEnter = () => {
//     clearTimeout(hoverTimeout.current);
//     setAccountOpen(true);
//   };

//   const handleMouseLeave = () => {
//     hoverTimeout.current = setTimeout(() => {
//       setAccountOpen(false);
//     }, 300);
//   };

//   return (
//     <>
//       {/* Top Navbar */}
//       <AppBar position="fixed" sx={{ bgcolor: '#131921', px: 2, zIndex: 1300 }}>
//         <Toolbar sx={{ minHeight: 60, justifyContent: 'space-between' }}>
//           {/* Logo and Location */}
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <RouterLink to="/home">
//               <img src={AmazonLogo} alt="Amazon" style={{ width: 100, objectFit: 'contain' }} />
//             </RouterLink>

//             <Box sx={{ ml: 1, color: '#fff', cursor: 'pointer' }}>
//               <Box display="flex" alignItems="center">
//                 <LocationOnIcon sx={{ fontSize: 20 }} />
//                 <Box ml={0.5}>
//                   <Typography variant="caption" fontSize={12}>Delivering to Vijayawada 520004</Typography>
//                   <Typography variant="body2" fontWeight="bold" fontSize={13}>Update location</Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>

//           {/* Search Bar */}
//           <Box sx={{ flexGrow: 1, mx: 2, display: 'flex', borderRadius: 1, overflow: 'hidden', bgcolor: '#fff' }}>
//             <Select
//               defaultValue="All"
//               size="small"
//               sx={{ bgcolor: '#ddd', fontSize: 12, px: 1 }}
//             >
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Electronics">Electronics</MenuItem>
//               <MenuItem value="Fashion">Fashion</MenuItem>
//             </Select>
//             <InputBase
//               placeholder="Search Amazon.in"
//               sx={{ pl: 1, flex: 1 }}
//             />
//             <IconButton sx={{ bgcolor: '#febd69', borderRadius: 0, px: 2 }}>
//               <SearchIcon sx={{ color: '#000' }} />
//             </IconButton>
//           </Box>

//           {/* Language */}
//           <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 0.5 }}>
//             <Avatar
//               src="https://flagcdn.com/w40/in.png"
//               alt="IN"
//               sx={{ width: 20, height: 15 }}
//               variant="square"
//             />
//             <Typography fontSize={13}>EN</Typography>
//             <ExpandMoreIcon sx={{ fontSize: 16 }} />
//           </Box>

//           {/* Account & Lists with Hover Delay Fix */}
//           <Box
//             sx={{ position: 'relative', ml: 2 }}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Box sx={{ color: '#fff', cursor: 'pointer' }}>
//               <Typography variant="caption" fontSize={12}>Hello, sign in</Typography>
//               <Box display="flex" alignItems="center">
//                 <Typography fontWeight="bold" fontSize={13}>Account & Lists</Typography>
//                 <ExpandMoreIcon sx={{ fontSize: 16 }} />
//               </Box>
//             </Box>

//             {accountOpen && (
//               <Paper
//                 elevation={4}
//                 sx={{
//                   position: 'absolute',
//                   top: '100%',
//                   right: 0,
//                   zIndex: 20,
//                   bgcolor: '#fff',
//                   p: 2,
//                   mt: 1,
//                   width: 500,
//                   borderRadius: 0
//                 }}
//               >
//                 <Box textAlign="center" mb={1}>
//                   <Button
//                     component={RouterLink}
//                     to="/signin"
//                     variant="contained"
//                     sx={{
//                       bgcolor: '#f0c14b',
//                       color: '#111',
//                       fontWeight: 'bold',
//                       px: 4,
//                       '&:hover': {
//                         bgcolor: '#e2b33c'
//                       }
//                     }}
//                   >
//                     Sign in
//                   </Button>

//                   <Typography fontSize={12} mt={1}>
//                     New customer?{" "}
//                     <RouterLink to="/register" style={{ color: '#007185' }}>
//                       Start here.
//                     </RouterLink>
//                   </Typography>
//                 </Box>

//                 <Divider sx={{ my: 1 }} />

//                 <Stack direction="row" spacing={4} alignItems="flex-start">
//                   <Box>
//                     <Typography fontWeight="bold" fontSize={14} mb={1}>Your Lists</Typography>
//                     {[
//                       'Create a Wish List',
//                       'Wish from Any Website',
//                       'Baby Wishlist',
//                       'Discover Your Style',
//                       'Explore Showroom'
//                     ].map((item, index) => (
//                       <Typography key={index} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>
//                         {item}
//                       </Typography>
//                     ))}
//                   </Box>

//                   <Box>
//                     <Typography fontWeight="bold" fontSize={14} mb={1}>Your Account</Typography>
//                     {[
//                       'Your Account',
//                       'Your Orders',
//                       'Your Wish List',
//                       'Your Recommendations',
//                       'Your Prime Membership',
//                       'Your Prime Video',
//                       'Your Subscribe & Save Items',
//                       'Memberships & Subscriptions',
//                       'Your Seller Account',
//                       'Manage Your Content and Devices',
//                       'Register for a free Business Account'
//                     ].map((item, index) => (
//                       <Typography key={index} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>
//                         {item}
//                       </Typography>
//                     ))}
//                   </Box>
//                 </Stack>
//               </Paper>
//             )}
//           </Box>

//           {/* Returns & Orders */}
//           <Box sx={{ color: '#fff', ml: 2 }}>
//             <Typography variant="caption" fontSize={12}>Returns</Typography>
//             <Typography fontWeight="bold" fontSize={13}>& Orders</Typography>
//           </Box>

//           {/* Cart */}
//           <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', ml: 2 }}>
//             <Badge badgeContent={0} color="warning">
//               <ShoppingCartIcon />
//             </Badge>
//             <Typography fontWeight="bold" fontSize={13} sx={{ ml: 1 }}>Cart</Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Bottom Nav Menu */}
//       <Box sx={{ bgcolor: '#232f3e', px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 2, mt: '60px' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', cursor: 'pointer' }}>
//           <MenuIcon fontSize="small" />
//           {/* <Typography variant="body2" fontSize={13} sx={{ ml: 0.5 }}>All</Typography> */}
//         </Box>
//         {navItems.map(item => (
//           <Typography
//             key={item.id}
//             variant="body2"
//             fontSize={12}
//             sx={{ color: '#fff', cursor: 'pointer' }}
//           >
//             {item.name}
//           </Typography>
//         ))}
//       </Box>
//     </>
//   );
// };

// import React, { useEffect, useState, useRef } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem,
//   Select, Box, Badge, Avatar, Button, Divider, Stack, Paper, Drawer, List, ListItem, ListItemText
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AmazonLogo from '../../assets/images/amazonlogo.png';

// export const Header = () => {
//   const [navItems, setNavItems] = useState([]);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedNav, setSelectedNav] = useState(null);
//   const hoverTimeout = useRef(null);

//   useEffect(() => {
//     fetch('http://localhost:8000/api/nav-items')
//       .then((res) => res.json())
//       .then((data) => setNavItems(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleMouseEnter = () => {
//     clearTimeout(hoverTimeout.current);
//     setAccountOpen(true);
//   };

//   const handleMouseLeave = () => {
//     hoverTimeout.current = setTimeout(() => {
//       setAccountOpen(false);
//     }, 300);
//   };

//   const handleNavClick = (item) => {
//     setSelectedNav(item);
//     setDrawerOpen(true);
//   };

//   return (
//     <>
//       {/* AppBar */}
//       <AppBar position="fixed" sx={{ bgcolor: '#131921', px: 2, zIndex: 1300 }}>
//         <Toolbar sx={{ minHeight: 60, justifyContent: 'space-between' }}>
//           {/* Logo and Location */}
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <RouterLink to="/home">
//               <img src={AmazonLogo} alt="Amazon" style={{ width: 100, objectFit: 'contain' }} />
//             </RouterLink>
//             <Box sx={{ ml: 1, color: '#fff', cursor: 'pointer' }}>
//               <Box display="flex" alignItems="center">
//                 <LocationOnIcon sx={{ fontSize: 20 }} />
//                 <Box ml={0.5}>
//                   <Typography variant="caption" fontSize={12}>Delivering to Vijayawada 520004</Typography>
//                   <Typography variant="body2" fontWeight="bold" fontSize={13}>Update location</Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>

//           {/* Search */}
//           <Box sx={{ flexGrow: 1, mx: 2, display: 'flex', borderRadius: 1, overflow: 'hidden', bgcolor: '#fff' }}>
//             <Select defaultValue="All" size="small" sx={{ bgcolor: '#ddd', fontSize: 12, px: 1 }}>
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Electronics">Electronics</MenuItem>
//               <MenuItem value="Fashion">Fashion</MenuItem>
//             </Select>
//             <InputBase placeholder="Search Amazon.in" sx={{ pl: 1, flex: 1 }} />
//             <IconButton sx={{ bgcolor: '#febd69', borderRadius: 0, px: 2 }}>
//               <SearchIcon sx={{ color: '#000' }} />
//             </IconButton>
//           </Box>

//           {/* Language */}
//           <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 0.5 }}>
//             <Avatar src="https://flagcdn.com/w40/in.png" alt="IN" sx={{ width: 20, height: 15 }} variant="square" />
//             <Typography fontSize={13}>EN</Typography>
//             <ExpandMoreIcon sx={{ fontSize: 16 }} />
//           </Box>

//           {/* Account & Lists */}
//           <Box
//             sx={{ position: 'relative', ml: 2 }}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Box sx={{ color: '#fff', cursor: 'pointer' }}>
//               <Typography variant="caption" fontSize={12}>Hello, sign in</Typography>
//               <Box display="flex" alignItems="center">
//                 <Typography fontWeight="bold" fontSize={13}>Account & Lists</Typography>
//                 <ExpandMoreIcon sx={{ fontSize: 16 }} />
//               </Box>
//             </Box>
//             {accountOpen && (
//               <Paper
//                 elevation={4}
//                 sx={{
//                   position: 'absolute',
//                   top: '100%',
//                   right: 0,
//                   zIndex: 20,
//                   bgcolor: '#fff',
//                   p: 2,
//                   mt: 1,
//                   width: 500,
//                   borderRadius: 0
//                 }}
//               >
//                 <Box textAlign="center" mb={1}>
//                   <Button
//                     component={RouterLink}
//                     to="/signin"
//                     variant="contained"
//                     sx={{
//                       bgcolor: '#f0c14b',
//                       color: '#111',
//                       fontWeight: 'bold',
//                       px: 4,
//                       '&:hover': { bgcolor: '#e2b33c' }
//                     }}
//                   >
//                     Sign in
//                   </Button>
//                   <Typography fontSize={12} mt={1}>
//                     New customer?{" "}
//                     <RouterLink to="/register" style={{ color: '#007185' }}>Start here.</RouterLink>
//                   </Typography>
//                 </Box>
//                 <Divider sx={{ my: 1 }} />
//                 <Stack direction="row" spacing={4} alignItems="flex-start">
//                   <Box>
//                     <Typography fontWeight="bold" fontSize={14} mb={1}>Your Lists</Typography>
//                     {['Create a Wish List', 'Wish from Any Website', 'Baby Wishlist', 'Discover Your Style', 'Explore Showroom'].map((item, index) => (
//                       <Typography key={index} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>{item}</Typography>
//                     ))}
//                   </Box>
//                   <Box>
//                     <Typography fontWeight="bold" fontSize={14} mb={1}>Your Account</Typography>
//                     {['Your Account', 'Your Orders', 'Your Wish List', 'Your Recommendations', 'Your Prime Membership', 'Your Prime Video', 'Your Subscribe & Save Items', 'Memberships & Subscriptions', 'Your Seller Account', 'Manage Your Content and Devices', 'Register for a free Business Account'].map((item, index) => (
//                       <Typography key={index} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>{item}</Typography>
//                     ))}
//                   </Box>
//                 </Stack>
//               </Paper>
//             )}
//           </Box>

//           {/* Returns & Orders */}
//           <Box sx={{ color: '#fff', ml: 2 }}>
//             <Typography variant="caption" fontSize={12}>Returns</Typography>
//             <Typography fontWeight="bold" fontSize={13}>& Orders</Typography>
//           </Box>

//           {/* Cart */}
//           <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', ml: 2 }}>
//             <Badge badgeContent={0} color="warning">
//               <ShoppingCartIcon />
//             </Badge>
//             <Typography fontWeight="bold" fontSize={13} sx={{ ml: 1 }}>Cart</Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Bottom Nav Menu */}
//       <Box sx={{ bgcolor: '#232f3e', px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 2, mt: '60px' }}>
//         <Box
//           sx={{ display: 'flex', alignItems: 'center', color: '#fff', cursor: 'pointer' }}
//           onClick={() => handleNavClick('All')}
//         >
//           <MenuIcon fontSize="small" />
//           {/* <Typography variant="body2" fontSize={13} sx={{ ml: 0.5 }}>All</Typography> */}
//         </Box>
//         {navItems.map(item => (
//           <Typography
//             key={item.id}
//             variant="body2"
//             fontSize={12}
//             sx={{ color: '#fff', cursor: 'pointer' }}
//             onClick={() => handleNavClick(item)}
//           >
//             {item.name}
//           </Typography>
//         ))}
//       </Box>

//       {/* Sidebar Drawer */}
//       <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//         <Box sx={{ width: 300, p: 2 }}>
//           <List>
//             {(selectedNav === 'All' ? navItems : selectedNav?.subItems || []).map((item, index) => (
//               <ListItem key={index} button>
//                 <ListItemText primary={item.name || item} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// import React, { useEffect, useState, useRef } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem,
//   Select, Box, Badge, Avatar, Button, Divider, Stack, Paper, Drawer
// } from '@mui/material'; // Removed List, ListItem, ListItemText as they are used in Sidebar
// import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AmazonLogo from '../../assets/images/amazonlogo.png';
// import { Sidebar } from '../Layouts/Sidebar';


// export const Header = () => {
//   const [navItems, setNavItems] = useState([]);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const hoverTimeout = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://localhost:8000/api/nav-items')
//       .then((res) => res.json())
//       .then((data) => setNavItems(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleMouseEnter = () => {
//     clearTimeout(hoverTimeout.current);
//     setAccountOpen(true);
//   };

//   const handleMouseLeave = () => {
//     hoverTimeout.current = setTimeout(() => {
//       setAccountOpen(false);
//     }, 300);
//   };

//   const handleNavClick = (item) => {
//     if (item === 'All') {
//       setDrawerOpen(true); // Open the sidebar when 'All' is clicked
//     } else {
//       // For other nav items, navigate directly
//       navigate(`/category/${item.id}/${item.name.toLowerCase().replace(/\s+/g, '-')}`);
//     }
//   };

//   return (
//     <>
//       {/* AppBar */}
//       <AppBar position="fixed" sx={{ bgcolor: '#131921', px: 2, zIndex: 1300 }}>
//         <Toolbar sx={{ minHeight: 60, justifyContent: 'space-between' }}>
//           {/* Logo and Location */}
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <RouterLink to="/home">
//               <img src={AmazonLogo} alt="Amazon" style={{ width: 100, objectFit: 'contain' }} />
//             </RouterLink>
//             <Box sx={{ ml: 1, color: '#fff', cursor: 'pointer' }}>
//               <Box display="flex" alignItems="center">
//                 <LocationOnIcon sx={{ fontSize: 20 }} />
//                 <Box ml={0.5}>
//                   <Typography variant="caption" fontSize={12}>Delivering to Vijayawada 520004</Typography>
//                   <Typography variant="body2" fontWeight="bold" fontSize={13}>Update location</Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//           {/* Search */}
//           <Box sx={{ flexGrow: 1, mx: 2, display: 'flex', borderRadius: 1, overflow: 'hidden', bgcolor: '#fff' }}>
//             <Select defaultValue="All" size="small" sx={{ bgcolor: '#ddd', fontSize: 12, px: 1 }}>
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Electronics">Electronics</MenuItem>
//               <MenuItem value="Fashion">Fashion</MenuItem>
//             </Select>
//             <InputBase placeholder="Search Amazon.in" sx={{ pl: 1, flex: 1 }} />
//             <IconButton sx={{ bgcolor: '#febd69', borderRadius: 0, px: 2 }}>
//               <SearchIcon sx={{ color: '#000' }} />
//             </IconButton>
//           </Box>
//           {/* Language */}
//           <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 0.5 }}>
//             <Avatar src="https://flagcdn.com/w40/in.png" alt="IN" sx={{ width: 20, height: 15 }} variant="square" />
//             <Typography fontSize={13}>EN</Typography>
//             <ExpandMoreIcon sx={{ fontSize: 16 }} />
//           </Box>
//           {/* Account & Lists */}
//           <Box
//             sx={{ position: 'relative', ml: 2 }}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Box sx={{ color: '#fff', cursor: 'pointer' }}>
//               <Typography variant="caption" fontSize={12}>Hello, sign in</Typography>
//               <Box display="flex" alignItems="center">
//                 <Typography fontWeight="bold" fontSize={13}>Account & Lists</Typography>
//                 <ExpandMoreIcon sx={{ fontSize: 16 }} />
//               </Box>
//             </Box>
//             {accountOpen && (
//               <Paper
//                 elevation={4}
//                 sx={{
//                   position: 'absolute',
//                   top: '100%',
//                   right: 0,
//                   zIndex: 20,
//                   bgcolor: '#fff',
//                   p: 2,
//                   mt: 1,
//                   width: 500,
//                   borderRadius: 0
//                 }}
//               >
//                 <Box textAlign="center" mb={1}>
//                   <Button
//                     component={RouterLink}
//                     to="/signin"
//                     variant="contained"
//                     sx={{
//                       bgcolor: '#f0c14b',
//                       color: '#111',
//                       fontWeight: 'bold',
//                       px: 4,
//                       '&:hover': { bgcolor: '#e2b33c' }
//                     }}
//                   >
//                     Sign in
//                   </Button>
//                   <Typography fontSize={12} mt={1}>
//                     New customer?{" "}
//                     <RouterLink to="/register" style={{ color: '#007185' }}>Start here.</RouterLink>
//                   </Typography>
//                 </Box>
//                 <Divider sx={{ my: 1 }} />
//                 <Stack direction="row" spacing={4} alignItems="flex-start">
//                   <Box>
//                     <Typography fontWeight="bold" fontSize={14} mb={1}>Your Lists</Typography>
//                     {['Create a Wish List', 'Wish from Any Website', 'Baby Wishlist', 'Discover Your Style', 'Explore Showroom'].map((item, index) => (
//                       <Typography key={index} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>{item}</Typography>
//                     ))}
//                   </Box>
//                   <Box>
//                     <Typography fontWeight="bold" fontSize={14} mb={1}>Your Account</Typography>
//                     {['Your Account', 'Your Orders', 'Your Wish List', 'Your Recommendations', 'Your Prime Membership', 'Your Prime Video', 'Your Subscribe & Save Items', 'Memberships & Subscriptions', 'Your Seller Account', 'Manage Your Content and Devices', 'Register for a free Business Account'].map((item, index) => (
//                       <Typography key={index} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>{item}</Typography>
//                     ))}
//                   </Box>
//                 </Stack>
//               </Paper>
//             )}
//           </Box>
//           {/* Returns & Orders */}
//           <Box sx={{ color: '#fff', ml: 2 }}>
//             <Typography variant="caption" fontSize={12}>Returns</Typography>
//             <Typography fontWeight="bold" fontSize={13}>& Orders</Typography>
//           </Box>
//           {/* Cart */}
//           <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', ml: 2 }}>
//             <Badge badgeContent={0} color="warning">
//               <ShoppingCartIcon />
//             </Badge>
//             <Typography fontWeight="bold" fontSize={13} sx={{ ml: 1 }}>Cart</Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {/* Bottom Nav Menu */}
//       <Box sx={{ bgcolor: '#232f3e', px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 2, mt: '60px' }}>
//         {/* Re-introducing the "All" button for the sidebar */}
//         <Box
//           sx={{ display: 'flex', alignItems: 'center', color: '#fff', cursor: 'pointer' }}
//           onClick={() => handleNavClick('All')} // This will open the sidebar
//         >
//           <MenuIcon fontSize="small" />
//           <Typography variant="body2" fontSize={13} sx={{ ml: 0.5 }}>All</Typography>
//         </Box>
      
//         {navItems.map(item => (
//           <Typography
//             key={item.id}
//             variant="body2"
//             fontSize={12}
//             sx={{ color: '#fff', cursor: 'pointer' }}
//             onClick={() => handleNavClick(item)} // This will navigate
//           >
//             {item.name}
//           </Typography>
//         ))}
//       </Box>
//       {/* Sidebar Drawer: Pass navItems to Sidebar */}
//       <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//         <Sidebar navItems={navItems} onClose={() => setDrawerOpen(false)} />
//       </Drawer>
//     </>
//   );
// };

// import React, { useEffect, useState, useRef } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import {
//   AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem,
//   Select, Box, Badge, Avatar, Button, Divider, Stack, Paper, Drawer, Collapse
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AmazonLogo from '../../assets/images/amazonlogo.png';

// export const Header = () => {
//   const [navItems, setNavItems] = useState([]);
//   const [subItemsMap, setSubItemsMap] = useState({});
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [openItemId, setOpenItemId] = useState(null);
//   const hoverTimeout = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://localhost:8000/api/nav-items')
//       .then(res => res.json())
//       .then(data => {
//         setNavItems(data);
//         data.forEach(item => {
//           fetch(`http://localhost:8000/api/nav-items/${item.id}/sub-items`)
//             .then(res => res.json())
//             .then(subs => {
//               const subArray = [];
//               subs.forEach(sub => {
//                 try {
//                   const parsed = JSON.parse(sub.sub_items);
//                   subArray.push(...(Array.isArray(parsed) ? parsed : [parsed]));
//                 } catch {
//                   subArray.push(sub.sub_items);
//                 }
//               });
//               setSubItemsMap(prev => ({ ...prev, [item.id]: subArray }));
//             });
//         });
//       })
//       .catch(err => console.error(err));
//   }, []);

//   const handleMouseEnter = () => {
//     clearTimeout(hoverTimeout.current);
//     setAccountOpen(true);
//   };

//   const handleMouseLeave = () => {
//     hoverTimeout.current = setTimeout(() => {
//       setAccountOpen(false);
//     }, 300);
//   };

//   const handleNavClick = (item) => {
//     if (item.name === 'All') {
//       setDrawerOpen(true);
//     } else {
//       navigate(`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`);
//     }
//   };

//   const handleCollapseToggle = (id) => {
//     setOpenItemId(prev => (prev === id ? null : id));
//   };

//   const handleSubItemClick = (navId, subName) => {
//     navigate(`/category/${navId}/${subName.toLowerCase().replace(/\s+/g, '-')}`);
//     setDrawerOpen(false);
//   };

//   return (
//     <>
//       {/* Top Navigation */}
//       <AppBar position="fixed" sx={{ bgcolor: '#131921', px: 2, zIndex: 1300 }}>
//         <Toolbar sx={{ minHeight: 60, justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <RouterLink to="/home">
//               <img src={AmazonLogo} alt="Amazon" style={{ width: 100 }} />
//             </RouterLink>
//             <Box sx={{ ml: 1, color: '#fff', cursor: 'pointer' }}>
//               <Box display="flex" alignItems="center">
//                 <LocationOnIcon sx={{ fontSize: 20 }} />
//                 <Box ml={0.5}>
//                   <Typography fontSize={12}>Deliver to Vijayawada</Typography>
//                   <Typography fontSize={13} fontWeight="bold">Update location</Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>

//           {/* Search Box */}
//           <Box sx={{ flexGrow: 1, mx: 2, display: 'flex', borderRadius: 1, overflow: 'hidden', bgcolor: '#fff' }}>
//             <Select defaultValue="All" size="small" sx={{ bgcolor: '#ddd', fontSize: 12, px: 1 }}>
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Electronics">Electronics</MenuItem>
//               <MenuItem value="Fashion">Fashion</MenuItem>
//             </Select>
//             <InputBase placeholder="Search Amazon.in" sx={{ pl: 1, flex: 1 }} />
//             <IconButton sx={{ bgcolor: '#febd69', borderRadius: 0, px: 2 }}>
//               <SearchIcon sx={{ color: '#000' }} />
//             </IconButton>
//           </Box>

//           {/* Language and Account */}
//           <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 0.5 }}>
//             <Avatar src="https://flagcdn.com/w40/in.png" sx={{ width: 20, height: 15 }} variant="square" />
//             <Typography fontSize={13}>EN</Typography>
//             <ExpandMoreIcon sx={{ fontSize: 16 }} />
//           </Box>

//           {/* Account Dropdown */}
//           <Box sx={{ position: 'relative', ml: 2 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//             <Box sx={{ color: '#fff', cursor: 'pointer' }}>
//               <Typography fontSize={12}>Hello, sign in</Typography>
//               <Box display="flex" alignItems="center">
//                 <Typography fontSize={13} fontWeight="bold">Account & Lists</Typography>
//                 <ExpandMoreIcon sx={{ fontSize: 16 }} />
//               </Box>
//             </Box>
//             {accountOpen && (
//               <Paper elevation={4} sx={{ position: 'absolute', top: '100%', right: 0, zIndex: 20, bgcolor: '#fff', p: 2, mt: 1, width: 500 }}>
//                 <Box textAlign="center" mb={1}>
//                   <Button component={RouterLink} to="/signin" variant="contained" sx={{ bgcolor: '#f0c14b', color: '#111', fontWeight: 'bold', px: 4 }}>
//                     Sign in
//                   </Button>
//                   <Typography fontSize={12} mt={1}>
//                     New customer? <RouterLink to="/register" style={{ color: '#007185' }}>Start here.</RouterLink>
//                   </Typography>
//                 </Box>
//                 <Divider sx={{ my: 1 }} />
//                 <Stack direction="row" spacing={4}>
//                   <Box>
//                     <Typography fontWeight="bold" fontSize={14}>Your Lists</Typography>
//                     {['Create a Wish List', 'Wish from Any Website'].map((item, i) => (
//                       <Typography key={i} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>{item}</Typography>
//                     ))}
//                   </Box>
//                   <Box>
//                     <Typography fontWeight="bold" fontSize={14}>Your Account</Typography>
//                     {['Your Orders', 'Prime Membership'].map((item, i) => (
//                       <Typography key={i} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>{item}</Typography>
//                     ))}
//                   </Box>
//                 </Stack>
//               </Paper>
//             )}
//           </Box>

//           {/* Cart */}
//           <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', ml: 2 }}>
//             <Badge badgeContent={0} color="warning">
//               <ShoppingCartIcon />
//             </Badge>
//             <Typography fontWeight="bold" fontSize={13} sx={{ ml: 1 }}>Cart</Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Bottom Navigation */}
//       <Box sx={{ bgcolor: '#232f3e', px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 2, mt: '60px' }}>
//         {navItems.map((item) => (
//           <Typography
//             key={item.id}
//             variant="body2"
//             fontSize={12}
//             sx={{ color: '#fff', cursor: 'pointer' }}
//             onClick={() => handleNavClick(item)}
//           >
//             {item.name === 'All' ? <><MenuIcon fontSize="small" sx={{ mr: 0.5 }} />All</> : item.name}
//           </Typography>
//         ))}
//       </Box>

//       {/* Drawer for All */}
//       <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//         <Box sx={{ width: 300, p: 2 }}>
//           {navItems.map(item => (
//             <Box key={item.id}>
//               <Box
//                 onClick={() => handleCollapseToggle(item.id)}
//                 sx={{
//                   cursor: 'pointer',
//                   py: 1,
//                   borderBottom: '1px solid #eee',
//                   '&:hover': { bgcolor: '#f1f1f1' }
//                 }}
//               >
//                 <Typography fontWeight="bold">{item.name}</Typography>
//               </Box>
//               <Collapse in={openItemId === item.id} timeout="auto" unmountOnExit>
//                 <Box sx={{ pl: 2 }}>
//                   {subItemsMap[item.id]?.map((sub, i) => (
//                     <Typography
//                       key={i}
//                       onClick={() => handleSubItemClick(item.id, sub)}
//                       sx={{
//                         cursor: 'pointer',
//                         py: 0.5,
//                         fontSize: 14,
//                         '&:hover': { color: '#007185' }
//                       }}
//                     >
//                       {sub}
//                     </Typography>
//                   ))}
//                 </Box>
//               </Collapse>
//             </Box>
//           ))}
//         </Box>
//       </Drawer>
//     </>
//   );
// };



import React, { useEffect, useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem,
  Select, Box, Badge, Avatar, Button, Divider, Stack, Paper, Drawer, Collapse
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AmazonLogo from '../../assets/images/amazonlogo.png';

export const Header = () => {
  const [navItems, setNavItems] = useState([]);
  const [subItemsMap, setSubItemsMap] = useState({});
  const [accountOpen, setAccountOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const hoverTimeout = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/nav-items')
      .then(res => res.json())
      .then(data => {
        setNavItems(data);
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

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setAccountOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setAccountOpen(false);
    }, 300);
  };

  const handleNavClick = (item) => {
    if (item.name === 'All') {
      setDrawerOpen(true);
    } else {
      navigate(`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const handleCollapseToggle = (id) => {
    setOpenItemId(prev => (prev === id ? null : id));
  };

  const handleSubItemClick = (navId, subName) => {
    navigate(`/category/${navId}/${subName.toLowerCase().replace(/\s+/g, '-')}`);
    setDrawerOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      {/* Top Navigation */}
      <AppBar position="fixed" sx={{ bgcolor: '#131921', px: 2, zIndex: 1300 }}>
        <Toolbar sx={{ minHeight: 60, justifyContent: 'space-between' }}>
          {/* Logo and Location */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/home">
              <img src={AmazonLogo} alt="Amazon" style={{ width: 100 }} />
            </RouterLink>
            <Box sx={{ ml: 1, color: '#fff', cursor: 'pointer' }}>
              <Box display="flex" alignItems="center">
                <LocationOnIcon sx={{ fontSize: 20 }} />
                <Box ml={0.5}>
                  <Typography fontSize={12}>Deliver to Vijayawada</Typography>
                  <Typography fontSize={13} fontWeight="bold">Update location</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Search Box */}
          <Box sx={{ flexGrow: 1, mx: 2, display: 'flex', borderRadius: 1, overflow: 'hidden', bgcolor: '#fff' }}>
            <Select defaultValue="All" size="small" sx={{ bgcolor: '#ddd', fontSize: 12, px: 1 }}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Fashion">Fashion</MenuItem>
            </Select>
            <InputBase placeholder="Search Amazon.in" sx={{ pl: 1, flex: 1 }} />
            <IconButton sx={{ bgcolor: '#febd69', borderRadius: 0, px: 2 }}>
              <SearchIcon sx={{ color: '#000' }} />
            </IconButton>
          </Box>

          {/* Language and Account */}
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 0.5 }}>
            <Avatar src="https://flagcdn.com/w40/in.png" sx={{ width: 20, height: 15 }} variant="square" />
            <Typography fontSize={13}>EN</Typography>
            <ExpandMoreIcon sx={{ fontSize: 16 }} />
          </Box>

          {/* Account Dropdown */}
          <Box sx={{ position: 'relative', ml: 2 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Box sx={{ color: '#fff', cursor: 'pointer' }}>
              <Typography fontSize={12}>Hello, sign in</Typography>
              <Box display="flex" alignItems="center">
                <Typography fontSize={13} fontWeight="bold">Account & Lists</Typography>
                <ExpandMoreIcon sx={{ fontSize: 16 }} />
              </Box>
            </Box>
            {accountOpen && (
              <Paper elevation={4} sx={{ position: 'absolute', top: '100%', right: 0, zIndex: 20, bgcolor: '#fff', p: 2, mt: 1, width: 500 }}>
                <Box textAlign="center" mb={1}>
                  <Button component={RouterLink} to="/signin" variant="contained" sx={{ bgcolor: '#f0c14b', color: '#111', fontWeight: 'bold', px: 4 }}>
                    Sign in
                  </Button>
                  <Typography fontSize={12} mt={1}>
                    New customer? <RouterLink to="/register" style={{ color: '#007185' }}>Start here.</RouterLink>
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Stack direction="row" spacing={4}>
                  <Box>
                    <Typography fontWeight="bold" fontSize={14}>Your Lists</Typography>
                    {['Create a Wish List', 'Wish from Any Website'].map((item, i) => (
                      <Typography key={i} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>{item}</Typography>
                    ))}
                  </Box>
                  <Box>
                    <Typography fontWeight="bold" fontSize={14}>Your Account</Typography>
                    {['Your Orders', 'Prime Membership'].map((item, i) => (
                      <Typography key={i} fontSize={13} sx={{ py: 0.3, cursor: 'pointer' }}>{item}</Typography>
                    ))}
                  </Box>
                </Stack>
              </Paper>
            )}
          </Box>

          {/* Cart */}
          <Box
            onClick={handleCartClick}
            sx={{ display: 'flex', alignItems: 'center', color: '#fff', ml: 2, cursor: 'pointer' }}
          >
            <Badge badgeContent={0} color="warning">
              <ShoppingCartIcon />
            </Badge>
            <Typography fontWeight="bold" fontSize={13} sx={{ ml: 1 }}>Cart</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Bottom Navigation */}
      <Box sx={{ bgcolor: '#232f3e', px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 2, mt: '60px' }}>
        {navItems.map((item) => (
          <Typography
            key={item.id}
            variant="body2"
            fontSize={12}
            sx={{ color: '#fff', cursor: 'pointer' }}
            onClick={() => handleNavClick(item)}
          >
            {item.name === 'All' ? <><MenuIcon fontSize="small" sx={{ mr: 0.5 }} />All</> : item.name}
          </Typography>
        ))}
      </Box>

      {/* Drawer for All */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          {navItems.map(item => (
            <Box key={item.id}>
              <Box
                onClick={() => handleCollapseToggle(item.id)}
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
      </Drawer>
    </>
  );
};
