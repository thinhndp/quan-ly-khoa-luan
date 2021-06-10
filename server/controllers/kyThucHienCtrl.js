import KyThucHien from '../models/KyThucHien.js';

export const getKyThucHiens = (req, res) => {
  KyThucHien.find()
    .then((kyThucHiens) => {
      res.status(200).json(kyThucHiens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getOneActiveKyThucHien = (req, res) => {
  KyThucHien.findOne({ status: 'DDR' })
    .then((kyThucHien) => {
      res.status(201).json(kyThucHien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const getKyThucHienById = (req, res) => {
  KyThucHien.findOne({ _id: req.params.id })
    .then((kyThucHien) => {
      res.status(201).json(kyThucHien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createKyThucHien = (req, res) => {
  const kyThucHien = req.body;
  const newKyThucHien = new KyThucHien(kyThucHien);

  newKyThucHien.save()
    .then(() => {
      res.status(201).json(newKyThucHien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateKyThucHienById = (req, res) => {
  const kyThucHien = req.body;
  const id = req.params.id;

  if (kyThucHien.status == 'DDR') {
    KyThucHien.findOne({ status: 'DDR' })
      .then((activeKTH) => {
        if (activeKTH != null && (activeKTH._id != kyThucHien._id)) {
          var msg = 'Không thể có 2 Kỳ thực hiện Khóa luận diễn ra cùng lúc';
          console.log(msg);
          res.status(400).json({ message: msg });
        }
        else {
          KyThucHien.updateOne({ _id: id }, kyThucHien)
            .then(() => {
              res.status(201).json(kyThucHien);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: err.message });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err.message });
      });
  }
  else {
    KyThucHien.updateOne({ _id: id }, kyThucHien)
      .then(() => {
        res.status(201).json(kyThucHien);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err.message });
      });
  }
}

export const deleteKyThucHien = (req, res) => {
  KyThucHien.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}