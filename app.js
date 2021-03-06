var express=require("express");
var mongoose=require("mongoose");
var session=require("express-session");


var adminCtrl=require("./controllers/adminCtrl");
var adminStudentCtrl=require("./controllers/adminStudentCtrl");
var adminCourseCtrl=require("./controllers/adminCourseCtrl");
var mainCtrl=require("./controllers/mainCtrl");

//Create express app obj
var app = express();
//Connect to database
//mongoose.connect('mongodb://localhost/scdb', {//********back up**********/
mongoose.connect('mongodb+srv://developerlin:Long2021...@cluster0.r4ghm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
	useNewUrlParser: true,
	useCreateIndex:true
}).then(()=>{
	console.log("Connect to db success");
}).catch(err=>{
	console.log("ERROR",err.message);
});
//Use session
//Use session
app.use(session({
	secret: 'scdb', 
	cookie: { maxAge: 1000 * 60 * 20 },
	resave: false ,  
	saveUninitialized : true
  }))

//Set model engine
app.set("view engine","ejs");
//Middlewares,routers
app.get('/admin'                 ,adminCtrl.showAdminDashboard);
app.get('/admin/student'         ,adminStudentCtrl.showAdminStudent);

app.get('/admin/student/import'  ,adminStudentCtrl.showAdminStudentImport);
app.post('/admin/student/import' ,adminStudentCtrl.doAdminStudentImport);
app.get('/admin/student/download',adminStudentCtrl.downloadStudentXlsx);

app.get('/admin/student/add'     ,adminStudentCtrl.showAdminStudentAdd);
app.post('/student'              ,adminStudentCtrl.addStudent); //add a student
app.delete('/student'            ,adminStudentCtrl.deleteStudent); //delete a student
app.propfind('/student/:sid'     ,adminStudentCtrl.checkStudentExist)
app.get('/student'               ,adminStudentCtrl.getAllStudents); //get all students
app.post('/student/:sid'         ,adminStudentCtrl.updateStudent); //modify some student
//app.get('/student'               ,adminStudentCtrl.checkWhoChangedPwd);

app.get('/admin/course'          ,adminCourseCtrl.showAdminCourse);
app.get('/admin/course/import'   ,adminCourseCtrl.showAdminCourseImport);
app.post('/admin/course/import'  ,adminCourseCtrl.doAdminCourseImport);
app.get('/admin/course/add'      ,adminCourseCtrl.showAdminCourseAdd);
app.post('/admin/course/'        ,adminCourseCtrl.updateCourse); //modify some course
app.delete('/course'             ,adminCourseCtrl.deleteCourse); 
app.post('/course'               ,adminCourseCtrl.addCourse);

app.get('/course'                ,adminCourseCtrl.getAllCourses); //get all students

app.get('/admin/report'          ,adminCtrl.showAdminReport);

app.get('/login'                 ,mainCtrl.showLogin);
app.post('/login'                ,mainCtrl.doLogin);
app.get('/logout'                ,mainCtrl.doLogout);
app.get('/'                      ,mainCtrl.showIndex);
app.get('/checkCourseApplicable' ,mainCtrl.checkCourseApplicable); //get all students
app.post('/applyCourse'          ,mainCtrl.applyCourse);
app.post('/cancelCourse'         ,mainCtrl.cancelCourse);
app.get('/myCourses'             ,mainCtrl.showMyCourses);
app.get('/checkMyCourses'        ,mainCtrl.checkMyCourses);




app.get('/changePwd'             ,mainCtrl.showChangePwd);
app.post('/changePwd'            ,mainCtrl.doChangePwd);
//Set static file
app.use(express.static("public"));
//Set 404 info page
/*
app.use(function(req,res){
    res.send("404! The page doesn't exist!!!");
})*/


//app.listen(3000);
app.listen(process.env.PORT, '0.0.0.0');
console.log("The app is running on server!")

// Initialize the app.
// var server = app.listen(process.env.PORT || 3000, function () {
// var port = server.address().port;
// console.log("App now running on port", port);
// });