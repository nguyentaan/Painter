import {
    useState,
    useEffect
} from 'react';
import {
    Link
} from 'react-router-dom';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import {
    useNavigate
} from 'react-router-dom';
import {
    useUser
} from '../../hook/UserContext';


const cx = classNames.bind(styles);
// const path = "https://backendpainter-v1.onrender.com"
const path =  "http://localhost:8081"


function Login() {
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasEmailError, setHasEmailError] = useState(false);
    const [hasPasswordError, setHasPasswordError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        login
    } = useUser();
    const navigate = useNavigate();


    useEffect(() => {
        fetchUser();
        // Check local storage for "rememberMe" flag and email
        const storedRememberMe = localStorage.getItem('rememberMe');
        const storedEmail = localStorage.getItem('email');
        if (storedRememberMe === 'true' && storedEmail) {
            setRememberMe(true);
            setEmail(storedEmail);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${path}/users`);
            setUser(response.data);
            // console.log(response)
        } catch (err) {
            console.error('Error fetching user: ', err);
        }
    };

    const handleMailChange = (e) => {
        setEmail(e.target.value);
        setHasEmailError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setHasPasswordError(false);
    };

    const validateForm = () => {
        let isValid = true;
        if (!email) {
            setHasEmailError(true);
            isValid = false;
        }
        if (!password) {
            setHasPasswordError(true);
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const foundUser = user.find((u) => u.email === email);
                if (foundUser) {
                    if (foundUser.password && foundUser.password === password) {
                        const userInfo = {
                            user_id: foundUser.user_id,
                            user_email: foundUser.email,
                            user_role: foundUser.role,
                        };
                        // Call the login function from useUser context
                        login(userInfo);
                        // You might want to replace this with a more user-friendly notification
                        alert('Login successfully');
                        if (foundUser.role === 'admin') {
                            navigate('/');
                        } else if (foundUser.role === 'user') {
                            navigate('/');
                        } else {
                            // navigate('/');
                        }

                        // Store email and "rememberMe" flag in local storage if "Remember me" is checked
                        if (rememberMe) {
                            localStorage.setItem('email', email);
                            localStorage.setItem('rememberMe', 'true');
                        } else {
                            // Clear stored email and "rememberMe" flag
                            localStorage.removeItem('email');
                            localStorage.removeItem('rememberMe');
                        }
                    } else {
                        // Invalid password
                        console.log('Invalid password');
                        // Add an alert for an invalid password
                        alert('Invalid password');
                    }
                } else {
                    // User not found
                    alert('User not found');
                }
            } catch (error) {
                console.error('Error during login:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return ( <
        div className = {
            cx('Desktop3')
        } >
        <
        div className = {
            cx('Login')
        } >
        <
        div className = {
            cx('text')
        } >
        <
        h2 > LOGIN < /h2> < /
        div > <
        form onSubmit = {
            handleSubmit
        }
        className = {
            cx('form')
        } >
        <
        label htmlFor = "uname" >
        <
        b > User Name < /b> < /
        label > <
        input placeholder = "Enter email"
        type = "text"
        id = "email"
        value = {
            email
        }
        onChange = {
            handleMailChange
        }
        className = {
            cx({
                error: hasEmailError,
            })
        }
        required /
        >
        {
            hasEmailError && < p className = "error-message" > Please enter a valid email < /p>}

            <
            label htmlFor = "psw" >
            <
            b > Password < /b> < /
            label > <
            input
            placeholder = "Enter password"
            type = "password"
            id = "password"
            value = {
                password
            }
            onChange = {
                handlePasswordChange
            }
            className = {
                cx({
                    error: hasPasswordError,
                })
            }
            required /
            >

            <
            div className = {
                cx('regis')
            } >
            <
            p className = {
                cx('regis')
            } >
            <
            i >
            <
            Link to = "/register" > Do not have an account ? < /Link> < /
            i > <
            /p> < /
            div >

            <
            label className = {
                cx('check')
            } >
            <
            input
            type = "checkbox"
            checked = {
                rememberMe
            }
            onChange = {
                (e) => setRememberMe(e.target.checked)
            }
            name = "remember" /
            >
            {
                ' '
            }
            Remember me <
            /label>

            <
            button className = {
                cx('button')
            }
            type = "submit"
            disabled = {
                loading
            } > {
                loading ? 'Signing in...' : 'Sign in'
            } <
            /button> < /
            form > <
            /div> < /
            div >
        );
    }

    export default Login;