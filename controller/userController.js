import { userService } from '../service';

const userSignUp = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      phoneNumber,
      roadAddress,
      detailAddress,
      zipCode,
    } = req.body;

    const essentialKeys = {
      email,
      password,
      name,
      phoneNumber,
      roadAddress,
      detailAddress,
      zipCode,
    };

    const values = Object.values(essentialKeys);
    const keys = Object.keys(essentialKeys);

    const keyResultOfUndefined = keys.filter((key) => {
      return essentialKeys[key] === undefined;
    });

    if (values.includes(undefined)) {
      let error = new Error(`KEY_ERROR ${keyResultOfUndefined}`);
      error.statusCode = 400;
      throw error;
    } else {
      await userService.userSignUp(
        email,
        password,
        name,
        phoneNumber,
        roadAddress,
        detailAddress,
        zipCode
      );
      res.status(201).json({
        message: 'USER_CREATED_SUCCESSFULLY',
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      let error = new Error('KEY_ERROR');
      error.statusCode = 400;
      throw error;
    }

    const token = await userService.userLogin(email, password);
    res.status(200).json({ message: 'LOGIN_SUCCESS!', token });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export default { userSignUp, userLogin };
