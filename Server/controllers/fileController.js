const path = require('path');
const multer = require('multer');
const User = require('../models/Users');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// exports.uploadProfilePicture = (req, res) => {
//   upload.single('profilePicture')(req, res, async (err) => {
//     if (err) {
//       return res.status(400).send(err.message);
//     }
    
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }
    
//     // Save the file path to the database
//     try {
//       const user = await User.findById(req.userId); // Assumes userId is passed in request
//       if (!user) {
//         return res.status(404).send('User not found.');
//       }
      
//       user.profilePicture = `/uploads/${req.file.filename}`;
//       await user.save();
      
//       res.json({ filePath: user.profilePicture });
//     } catch (error) {
//       res.status(500).send('Server error');
//     }
//   });
// };


exports.uploadProfilePicture = (req, res) => {
  upload.single('profilePicture')(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).send(err.message);
    }
    
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
    try {
      const user = await User.findById(req.userId); 
      if (!user) {
        return res.status(404).send('User not found.');
      }
      
      user.profilePicture = `/uploads/${req.file.filename}`;
      await user.save();
      
      res.json({ filePath: user.profilePicture });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).send('Server error');
    }
  });
};

