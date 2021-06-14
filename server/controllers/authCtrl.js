import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import User from '../models/User.js';
import SinhVien from '../models/SinhVien.js';
import GiangVien from '../models/GiangVien.js';

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

export const authGoogle = async (req, res) => {
  const { token }  = req.body;
  console.log('token');
  console.log(token);
  client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
  }).then((ticket) => {
    const info = ticket.getPayload();
    const svPromise = SinhVien.findOne({ 'email': info.email });
    const gvPromise = GiangVien.findOne({ 'email': info.email });
    Promise.all([ svPromise, gvPromise ])
      .then((promiseRes) => {
        let relatedInfoSV = null;
        let relatedInfoGV = null;
        let role = null;
        if (promiseRes[0] != null) {
          relatedInfoSV = new mongoose.Types.ObjectId(promiseRes[0]._id);
          role = "SinhVien";
        }
        else if (promiseRes[1] != null) {
          relatedInfoGV = new mongoose.Types.ObjectId(promiseRes[1]._id);
          role = "GiangVien";
        }
        User.findOneAndUpdate(
          {'email': info.email},
          { 
            name: info.name,
            email: info.email,
            picture: info.picture,
            relatedInfoSV: relatedInfoSV,
            relatedInfoGV: relatedInfoGV,
            role: role
          },
          {
            new: true,
            upsert: true
          }
        ).then((user) => {
          // console.log('** user **');
          // console.log(user);
          User.findById(user._id).populate('relatedInfoSV').populate('relatedInfoGV')
            .then((fUser) => {
              console.log('** fUser **');
              console.log(fUser);
              res.status(201).json(fUser);
            }).catch((err) => {
              res.status(400).json({ message: err.message });
            });
        });
      })
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });
}
