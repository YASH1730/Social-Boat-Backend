require('dotenv').config();
const fs = require("fs");
const userDB = require('../database/modals/user')

exports.test = async (req, res) => {
  res.send("hello");
};

exports.createFile = async (req, res) => {
  try {
    const { fileName } = req.query;
    const url = "https://5a21-2401-4900-1c7a-ed05-25be-d4c2-ce22-1461.ngrok-free.app/scripts/";
    fs.writeFileSync(
      `public/scripts/${fileName}.js`,
      `function Show() {
        const container = document.createElement('div');
        // default
        container.style.position = "fixed"
        container.style.zIndex = 1000
        container.style.display = "flex"
        container.style.justifyContent = "center"
        container.style.flexDirection = "column"
        container.style.alignContent = "center"
        
        document.body.appendChild(container)
        }
        
        Show()`
    );
    return res.status(200).send({
      status: "success",
      code: 200,
      url: `${url}${fileName}.js`,
    });
  } catch (error) {
    console.log("ERROR >>> ", error);
    return res.status(500).send({
      status: "Error",
      code: 500,
    });
  }
};

exports.createUser = async (req,res)=>{
    try {
        console.log(req.body)
        let {username,email,tag_id, shop} = req.body;
        if(!email || !tag_id || !shop)
            return res.status(203).send({
                status : 203,
                message : "Missing payload."
            })

        // check does it already exist 
        let check = await userDB.findOne({email});

        if(check)
        {
            return res.status(200).send({ status : 200, data : check, message : "User already exist !!!"})
        }

        let data = userDB({username,email,tag_id,shop});
        data = await data.save();

        if(data)
        return res.status(200).send({ status : 200, data : {username,email,tag_id,shop} , message : "User created !!!"})
        
    } catch (error) {
        console.log("ERROR >>> ",error)
        return res.status(500).send({
            status : 500,
            error
        })
    }
}

exports.updateScript = async(req,res)=>{
    try {
        // create a script 
        let icons = {
          Facebook : `${process.env.IMG_URI}/facebook.svg`,
          Instagram : `${process.env.IMG_URI}/instagram.svg`,
          Pinterest : `${process.env.IMG_URI}/pinterest.svg`,
          Twitter : `${process.env.IMG_URI}/twitter.svg`,
          LinkdIn : `${process.env.IMG_URI}/linkedin.svg`,
          YouTube : `${process.env.IMG_URI}/youtube.svg`,
          Whatsapp : `${process.env.IMG_URI}/whatsapp.svg`,
          Gmail : `${process.env.IMG_URI}/gmail.svg`,
          Phone : `${process.env.IMG_URI}/phone.svg`,
        }

   

        let {rows, position, icon_width, top_pos, shop,bottom_pos} = req.body;
        let compScript = "";

        let positions = { 
          'top-right' : `container.style.right = "0%"; container.style.top = "${top_pos}%";`,
          'top-left' : `container.style.left = "0%"; container.style.top = "${top_pos}%";`,
          'bottom-right' : `container.style.right = "0%"; container.style.bottom = "${bottom_pos}%"; `,
          'bottom-left' : `container.style.bottom = "${bottom_pos}%";`
      }


        console.log(req.body)
        
        rows.map(row=>{
          row.name !== 'custom'?
          compScript+=`<div style="width: ${icon_width}px;height: ${icon_width}px;">
        <a target='__blank' href='${row.url}' style="width: 100%;" >
        <img src='${icons[row.name]}' alt='${row.name}' style="width: 100%;" />
        </a>
        </div>`:compScript+=`<div style="width: ${icon_width}px;height: ${icon_width}px;">
        <a target='__blank' href='${row.url}' style="width: 100%;" >
        <img src='${row.img}' alt='${row.name}' style="width: 100%;" />
        </a>
        </div>` 
      }
        )


        fs.writeFileSync(
          `public/scripts/${shop}.js`,  `function Show() {
            const container = document.createElement('div');
            // default
            container.style.position = "fixed"
            container.style.zIndex = 1000
            container.style.display = "flex"
            container.style.justifyContent = "center"
            container.style.flexDirection = "column"
            container.style.alignContent = "center"
            ${positions[position]}            
            
            
            container.innerHTML = ${"`"+compScript+"`"}
            


            document.body.appendChild(container)
            }
            
            Show()`)

        return res.status(200).send({
          status : 200,
          message : "Script Updated."
        })
    } catch (error) {
        console.log("ERROR >>> ",error)
        return res.status(500).send({
            status : 500,
            error
        })
    }
}

exports.uploadIcon = async (req,res)=>{
  try {
    let {filename,size} = req.file;
    console.log(req.file)
    if(!filename)
    return res.status(203).send({
    status : 203, message : "No image found."});
    // if(size/1000 > 2)
    // return res.status(203).send({
    // status : 203, message : "Image should be less then 2mb found."});
    return res.status(200).send({
      status : 200,
      url : process.env.IMG_URI+'/'+filename,
      message : "Icon Uploaded"
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status  : 500,
      message : "Something went wrong !!!"
    })
  }
}

