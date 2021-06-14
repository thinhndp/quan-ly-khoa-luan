import User from '../models/User.js';

export const getUsers = (req, res) => {
  User.find()
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

export const getUsersWithQuery = (req, res) => {
  const { search, pagingOptions } = req.body;
  const { role } = req.query;
  /* const filter = {
    role: { $regex: new RegExp("^.*" + role + ".*") }
  }; */
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
}

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

export const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}