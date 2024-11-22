export const validateSchema = (schema) => (req, res, next) => {
    console.log('Entrando al Schema')
    try {
        schema.parse(req.body)
        next();
    } catch (error) {
        return res.status(400).json({ error: error.errors.map(err => err.message)});
    }
};