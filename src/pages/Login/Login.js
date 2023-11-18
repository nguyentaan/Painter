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

function Login() {
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasEmailError, setHasEmailError] = useState(false);
    const [hasPasswordError, setHasPasswordError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        login,
        pathBackEnd
    } = useUser();
    const navigate = useNavigate();

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

    const handleLoginApi = (email, password) => {
        return axios.post('api/login', { email, password });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                // Fetch user information from the backend using the token
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
                console.log('The token of client ' + token);

                const userResponse = await axios.post(`${pathBackEnd}/login`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true, // Add this line to include credentials (cookies)
                  });
                console.log(userResponse.data);
                const userInfo = userResponse.data;
                // Store the token in a secure way (e.g., using HttpOnly cookie)
                document.cookie = `token=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
                // Call the login function from useUser context, passing user information
                login(userInfo);
                alert('Login successfully');
                // Redirect the user to the desired page
                navigate('/');
            } catch (error) {
                console.error('Error fetching user information:', error);
                alert('Login failed');
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
        h2 > LOGIN < /h2>{' '} <
        /div>{' '} <
        form onSubmit = {
            handleSubmit
        }
        className = {
            cx('form')
        } >
        <
        label htmlFor = "uname" >
        <
        b > User Name < /b>{' '} <
        /label>{' '} <
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
        > {
            hasEmailError && < p className = "error-message" > Please enter a valid email < /p>} <
            label htmlFor = "psw" >
            <
            b > Password < /b>{' '} <
            /label>{' '} <
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
            Link to = "/register" > Do not have an account ? < /Link>{' '} <
            /i>{' '} <
            /p>{' '} <
            /div> <
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
            > {
                ' '
            }
            Remember me {
                ' '
            } <
            /label> <
            button className = {
                cx('button')
            }
            type = "submit"
            disabled = {
                loading
            } > {
                ' '
            } {
                loading ? 'Signing in...' : 'Sign in'
            } {
                ' '
            } <
            /button>{' '} <
            /form>{' '} <
            /div>{' '} <
            /div>
        );
    }

    export default Login;