const Enquiry = require('../models/Enquiry');

// @desc   Create a new enquiry
// @route  POST /api/enquiries
// @access Public
exports.createEnquiry = async (req, res) => {
    try {
        console.log("createEnquiry called with body:", req.body);
        const { name, email, phone, message, propertyId } = req.body;

        const enquiry = await Enquiry.create({
            name,
            email,
            phone,
            message,
            property: propertyId || null
        });
        console.log("Enquiry created:", enquiry);

        res.status(201).json(enquiry);
    } catch (err) {
        console.error("Error creating enquiry:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc   Get all enquiries
// @route  GET /api/enquiries
// @access Private (admin)
exports.getEnquiries = async (req, res) => {
    try {
        console.log("getEnquiries called");
        const enquiries = await Enquiry.find()
            .populate('property', 'title') // Populate property title
            .sort({ createdAt: -1 });
        console.log("Enquiries found:", enquiries.length);
        res.json(enquiries);
    } catch (err) {
        console.error("Error fetching enquiries:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc   Delete enquiry
// @route  DELETE /api/enquiries/:id
// @access Private (admin)
exports.deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        res.json({ message: 'Enquiry deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
