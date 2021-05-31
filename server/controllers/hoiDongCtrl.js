import HoiDong from '../models/HoiDong.js';

export const getHoiDongs = (req, res) => {
  HoiDong.find()
    .populate('phongHoc').populate('deTais').populate('canBoPhanBien')
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
    .populate('phongHoc').populate('deTais').populate('canBoPhanBien')
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

  var errMsg = checkErrWhenUpserting(newHoiDong);

  if (errMsg != '') {
    res.status(400).json({ message: errMsg });
    return;
  }

  newHoiDong.save()
    .then(() => {
      res.status(201).json(newHoiDong);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateHoiDongById = (req, res) => {
  const hoiDong = req.body;
  const id = req.params.id;

  var errMsg = checkErrWhenUpserting(hoiDong);

  if (errMsg != '') {
    res.status(400).json({ message: errMsg });
    return;
  }

  HoiDong.updateOne({ _id: id }, hoiDong)
    .then(() => {
      res.status(201).json(hoiDong);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteHoiDongById = (req, res) => {
  HoiDong.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

const checkErrWhenUpserting = (hoiDong) => {
  if (hoiDong.startAt >= hoiDong.endAt) {
    return "Thời gian kết thúc phải sau thời gian bắt đầu";
  }

  console.log(hoiDong.startAt);
  console.log(HoiDong.find({ 
    startAt: { $lt: hoiDong.startAt },
    endAt: { $gt: hoiDong.startAt }
  }));

  var hdStartBefore = HoiDong.find({ 
    startAt: { $lt: hoiDong.startAt },
    endAt: { $gt: hoiDong.startAt },
    phongHoc: hoiDong.phongHoc,
  });
  var hdStartBetween = HoiDong.find({
    startAt: { $gte: hoiDong.startAt, $lt: hoiDong.endAt },
    phongHoc: hoiDong.phongHoc,
  });

  if (hdStartBefore.length > 0 || hdStartBetween.length > 0) {
    console.log('overlap');
    return "Trùng thời gian và địa điểm với hội đồng khác";
  }



  return '';
}