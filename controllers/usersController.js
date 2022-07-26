const {user, user_bio} = require("../models");

  const getAllplayer = async (req, res) => {
    try { 
      const player = await user.findAll({ 
        include: user_bio
      });
    res.status(200).json({
      massege: "Profile",
      player
    })
  } catch(err) {
    console.error(err.massege);
  }
  };
  
  const seeProfile = async (req, res) => {
    const profile = await user.findOne({
      where: {
        id: req.params.id,
      },
    })
    const profiles = await user_bio.findOne({
      where: {
        id: req.params.id
      },
    })
    res.status(200).json({
      message: "profile-page",
      profile,
      profiles
    })
  }

  const getUpdateprofile = async (req, res) => {
    const updateProfile = await user.findOne({
      include: user_bio
    });
    res.status(200).json({
      updateProfile,
    }) 
  };
  
  const postUpdateUser = async (req, res) => {
    const { username, nama, email, socialMedia, aboutMe  } = req.body;
    const query = {
      where: {
        id: req.params.id,
      },
    };
    user.update({ username,email }, query);
    user_bio.update(
      {
        nama,
        socialMedia,
        aboutMe,
      },
      query,
    ); 
    res.status(200).json({
      massege: "data updated",
      playerUser,
      playerBio,
  })
}

  module.exports = {
    getAllplayer,
    seeProfile,
    getUpdateprofile,
    postUpdateUser
  }