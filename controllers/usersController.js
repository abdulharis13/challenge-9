const {user, user_bio} = require("../models");
const bcrypt = require("bcrypt")

  const getAllplayer = async (req, res) => {
    try { 
      const player = await user.findAll({
        include: user_bio
      });
    res.status(200).json({
      massege: "Profile",
      player
    });
  } catch(err) {
    console.error(err.massege);
  }
  };
  
  const getProfile = async (req, res) => {
    const profile = [ await user.findOne({
      model: {
        include: user_bio
      },
      where: {
        id: req.params.id,
      },
      
    })
  ]
    // const profiles =[ 
    //   await user_bio.findOne({
    //     where: {
    //       id_foreign: profile.id
    //     },
    //     attributes: ["nama", "socialMedia", "aboutMe"]
    //   })
    // ]
    res.status(200).json({
      message: "profile-page",
      profile,
    })
  }

  const getUpdateprofile = async (req, res) => {
    const getUser = await user.findOne({
      where:{
        id: req.params.id
      },
      include:{
        model: user_bio
      }
    });
    res.status(200).json({
      getUser,
    }) 
  };
  
  const postUpdateUser = async (req, res) => {
    const { username, password, email } = req.body;
    const query = {
      where: {
        id: req.params.id,
      },
    };
    const profile = user.update({ username, password, email }, query);
    const profiles = user_bio.update( 
      {
        nama: req.body.nama,
        socialMedia: req.body.socialMedia,
        aboutMe: req.body.aboutMe,
      }, {
        where: {
          id_foreign: req.params.id
        }
      }
    ); 
    res.status(200).json({
      massege: "data updated",
      profile,
      profiles
  })
}

  module.exports = {
    getAllplayer,
    getProfile,
    getUpdateprofile,
    postUpdateUser
  }