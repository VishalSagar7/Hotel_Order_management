import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import AdminModel from '../Models/AdminModel.js';

dotenv.config();

const adminTokenVerification = async (req, res, next) => {
    const token = req.cookies['admin-token']; // Retrieve the token from cookies

    
    
    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }
    

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded token (admin data) to the request object

        const admin = await AdminModel.findById(decoded.adminId);
    
        

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        req.admin = admin

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Invalid token, authorization denied.' });
    }
};

export default adminTokenVerification;
