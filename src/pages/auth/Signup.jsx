import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';

const initialFormData = {
    username: '',
    password: '',
    passwordConf: '',
    phoneNumber: '',
    name: '',
    email: '',

}
const Signup = ({ getUserProfile }) => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(formData)
            await getUserProfile()
            setFormData(initialFormData)
            navigate('/dashboard')
        } catch (error) {
            setMessage(error.response?.data?.error)
            console.log(error);
        }
    };

    const isFormInvalid = () => {
        return !(formData.username && formData.password && formData.password === formData.passwordConf && formData.phoneNumber && formData.name && formData.email);
    };

    return (
        <main>
            <h1>Sign Up</h1>
            <p style={{ color: 'red' }}>{message}</p>
            <form onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        value={formData.passwordConf}
                        name="passwordConf"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="number"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        name="phoneNumber"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <section>
                    <button disabled={isFormInvalid()}>Sign Up</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </section>
            </form>
        </main>
    );
};

export default Signup;
