import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import * as Utils from '../utils/utils.js';

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

export const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getUsersWithQuery = (req, res) => {
  // Search and Paging
  const { search, pagingOptions } = req.body;

  // Filters
  const reqQuery = { ...req.query };
  const removeFields = [ "sort" ];
  removeFields.forEach((val) => delete reqQuery[val]);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = Utils.getConvertedQueryString(queryStr);

  const queryFilters = JSON.parse(queryStr);
  var rawFilters = {
    name: '',
    role: '',
    email: '',
    canApprove: '',
  }
  rawFilters = { ...rawFilters, ...queryFilters };
  var filters = {
    name: rawFilters.name == '' ? Utils.getIncludeFilter(search) : Utils.getIncludeFilter(rawFilters.name),
    role: Utils.getIncludeFilter(rawFilters.role),
    email: Utils.getIncludeFilter(rawFilters.email),
    canApprove: rawFilters.canApprove == 'TRUE' ? true : false,
  };
  if (rawFilters.canApprove == '') {
    delete filters.canApprove;
  }
  console.log(filters);

  User.paginate(filters, {
    ...pagingOptions,
    populate: 'relatedInfoSV relatedInfoGV'
  })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getUsersByRole = (req, res) => {
  const { role } = req.body;
  User.find({ role: role })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

/* export const getUsersWithQuery = (req, res) => {
  const { search, pagingOptions } = req.body;
  const { role } = req.query;
  const searchRegex = new RegExp("^.*" + (search ? search : '') + ".*");
  const filter = {
    name: { $regex: searchRegex, $options: "i" },
    role: { $regex: new RegExp("^.*" + (role ? role : '') + ".*") }
  };
  User.paginate(filter, {
    ...pagingOptions,
    populate: 'relatedInfoSV relatedInfoGV'
  }).then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
} */

export const getUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createUser = (req, res) => {
  const user = req.body;
  const newUser = new User(user);

  if (newUser.role == 'ChuNhiemKhoa') {
    newUser.canApprove = true;
  }

  newUser.save()
    .then(() => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateUserById = (req, res) => {
  const user = req.body;
  const id = req.params.id;

  User.updateOne({ _id: id }, user)
    .then(() => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const bearerHeader = req.headers['authorization'];
    // console.log(req.headers);
    // console.log(bearerHeader);
    if (bearerHeader != null) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];

      const ticket = await client.verifyIdToken({
        idToken: bearerToken,
        audience: CLIENT_ID
      });

      const userInfo = ticket.getPayload();

      const requestingUser = await User.findOne({ email: userInfo.email });
      if (requestingUser.role != 'CanBoKhoa' && requestingUser.role != 'ChuNhiemKhoa') {
        console.log(1);
        // console.log(requestingUser);
        res.status(400).json({ message: 'Không đủ quyền để thực hiện thao tác này' });
        return;
      }
      const userToBeDelete = await User.findById(id);
      if (requestingUser.role == 'CanBoKhoa' && userToBeDelete.role == 'ChuNhiemKhoa') {
        console.log(2);
        res.status(400).json({ message: 'Không đủ quyền để thực hiện thao tác này' });
        return;
      }

      console.log(requestingUser);
      console.log(userToBeDelete);

      await User.deleteOne({ _id: id });
      res.status(201).json(id);
    }
    else {
      res.status(400).json({ message: 'Không lấy được token của user hiện tại, vui lòng đăng nhập lại' });
    }
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}