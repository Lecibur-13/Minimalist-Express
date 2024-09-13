async function TestController(req, res) {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: 'The "message" field is required' });

    try {
        return res.status(200).json({ success: true, message: 'Successful' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error' });
    }
}

export { TestController };