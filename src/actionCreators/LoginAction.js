import axios from "axios";

const url =  "http://localhost:8081"
// const url =  "https://backendpainter-v1.onrender.com"

export const loginUser = (data, navigate) => {
  return async (dispatch) => {
    try {
      console.log('Before axios.post');
      const response = await axios.post(`${url}/login`, data);
      console.log('After axios.post');

      if (response.status === 200 && response.data.status === "success") {
        console.log('Successful login:', response.data);
        dispatch({
          type: "LOGIN_USER_SUCCESS",
          payload: response.data.token,
        });
        // Redirect to the home page or any other route
        navigate('/');
      } else {
        console.log('Login failed:', response.data.error);
        dispatch({
          type: "LOGIN_USER_FAILED",
          payload: response.data.error,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      const output = error.response ? error.response.data : { error: 'Unknown error' };
      dispatch({
        type: "LOGIN_USER_FAILED",
        payload: output.error,
      });
    }
  };
};

export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${url}/register`, data);
      console.log(response);

      const output = response.data;
      if (output.status === "success") {
        dispatch({
          type: "REGISTER_USER_SUCCESS",
          payload: output.message,
        });
      }
    } catch (error) {
      const output = error.response.data;
      if (output.message) {
        dispatch({
          type: "REGISTER_USER_FAIL",
          payload: output.message,
        });
      } else {
        dispatch({
          type: "REGISTER_USER_INVALID",
          payload: output.error,
        });
      }
    }
  };
};

export const userLogout = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT_USER",
    });
  };
};
// export const loginAdmin = (data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(`${url}/login`, data);
//       const output = response.data;

//       if (output.status === "success") {
//         dispatch({
//           type: "LOGIN_ADMIN_SUCCESS",
//           payload: output.token,
//         });
//       }
//     } catch (error) {
//       const output = error.response.data;
//       dispatch({
//         type: "LOGIN_ADMIN_FAILED",
//         payload: output.error,
//       });
//     }
//   };
// };

