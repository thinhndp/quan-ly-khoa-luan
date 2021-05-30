import HoiDong from '../models/HoiDong.js';

export const getHoiDongs = (req, res) => {
  HoiDong.find()
    .populate('phongHoc').populate('deTai').populate('canBoPhanBien')
    .populate('canBoHuongDan').populate('chuTich').populate('thuKy')
    .populate('uyVien')
    .then((hoiDongs) => {
      res.status(200).json(hoiDongs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const getHoiDongById = (req, res) => {
  HoiDong.findOne({ _id: req.params.id })
    .populate('phongHoc').populate('deTai').populate('canBoPhanBien')
    .populate('canBoHuongDan').populate('chuTich').populate('thuKy')
    .populate('uyVien')
    .then((hoiDong) => {
      res.status(201).json(hoiDong);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createHoiDong = (req, res) => {
  const hoiDong = req.body;
  const newHoiDong = new HoiDong(hoiDong);

  newHoiDong.save()
    .then(() => {
      res.status(201).json(newHoiDong);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};