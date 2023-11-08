import {
    useState,
    useEffect
} from 'react';
import {
    useNavigate
} from 'react-router-dom';
// Use useNavigate from react-router
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Register() {
    const [user, setUser] = useState([]);

    const [email, setEmail] = useState('');
    const [hasEmailError, setHasEmailError] = useState(false);

    const [password, setPassword] = useState('');
    const [hasPasswordError, setHasPasswordError] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const handleMailChange = (e) => {
        setEmail(e.target.value);
        setHasEmailError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setHasPasswordError(false);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMismatch(false);

    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/users`);
            setUser(response.data);
            console.log(response.data);
        } catch (err) {
            console.error('Error fetching user: ', err);
        }
    };

    const handleRegisterUser = (user) => {
        return axios
            .post(`http://localhost:8081/create-user`, user)
            .then(() => {
                alert('User registration successfully');
                fetchUser();
            })
            .catch((err) => {
                console.log(err);
                throw err; // Rethrow the error to be caught in the calling code
            });
    };
    const validateForm = () => {
        let isValid = true;

        if (!email) {
            setHasEmailError(true);
            isValid = false;
        } else if (user.some((u) => u.email === email)) {
            isValid = false;
        }

        if (!confirmPassword || password !== confirmPassword) {
            isValid = false;
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }

        if (!password) {
            setHasPasswordError(true);
            isValid = false;
        }
        return isValid;
    };

    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userData = {
                email,
                password,
                role: 'user',
            };
            handleRegisterUser(userData)
                .then(() => {
                    console.log('User registered successfully');
                    // Reset the form fields after successful submission
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    // navigate('/#');
                })
                .catch((error) => {
                    console.error('Error registering user:', error);
                });
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
        h2 > Register < /h2> < /div > <
        form onSubmit = {
            handleSubmit
        }
        className = {
            cx('form')
        } >
        <
        label
        for = "uname" >
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
                error: !hasEmailError,
            })
        }
        required /
        >

        <
        label
        for = "psw" >
        <
        b > Password < /b> < /
        label > <
        input placeholder = "Enter password"
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
                error: !hasPasswordError,
            })
        }
        required /
        >


        <
        label
        for = "psw" >
        <
        b > Confirm Password < /b> < /
        label > <
        input placeholder = "Confirm password"
        type = "password"
        id = "password"
        value = {
            confirmPassword
        }
        onChange = {
            handleConfirmPasswordChange
        }
        className = {
            cx({
                error: !hasPasswordError,
            })
        }
        required /
        >
        {
            passwordMismatch && ( <
                p className = "error-message" > Passwords do not match < /p>
            )
        }

        <
        button className = {
            cx('button')
        }
        type = "submit"
        onClick = {
            handleSubmit
        } >
        Register <
        /button> <
        Link to = "/login" > Already have account ? < /Link>

        <
        /form> < /
        div > <
        /div>
    );
}
export default Register;