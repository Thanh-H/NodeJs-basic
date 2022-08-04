import pool from '../configs/connectDB'
import multer from 'multer'
let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', { dataUser: rows })
}
let getDetailpage = async (req, res) => {
    let id = req.params.id;
    let [user, fields] = await pool.execute('select * from users where id=?', [id]);
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {

    let { firstName, lastName, email, address } = req.body
    await pool.execute('insert into users(firstName,lastName,email,address )values(?,?,?,?)',
        [firstName, lastName, email, address]);
    return res.redirect('/')

}

let deleteUser = async (req, res) => {
    let id = req.body.id
    await pool.execute('DELETE FROM users where id=?', [id])
    return res.redirect('/')
}
// Begin Edit
let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user, fields] = await pool.execute('select * from users where id=?', [id]);
    return res.render('update.ejs', { dataUser: user[0] }) // Tạo obj: key: value
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body
    await pool.execute('update users set firstName=?,lastName=?,email=?,address=? where id=?',
        [firstName, lastName, email, address, id])
    return res.redirect('/')
}
//End Edit

let getUploadFilePage = (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {

    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}


let handleUploadMultipleFiles = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

}

module.exports = {
    getHomepage,
    getDetailpage,
    createNewUser,
    deleteUser,
    getEditPage, postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles
}