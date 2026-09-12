import authService from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ status: 'error', message: 'Name, email, and password are required' });
        }
        const user = await authService.register({ name, email, password });
        res.status(201).json({ status: 'success', data: user });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }
        const user = await authService.login({ email, password });
        res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        res.status(401).json({ status: 'error', message: error.message });
    }
};

