const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const listPosts = [
    {
        id: 1,
        task: 'No tasks' ,
        date: '2023/08/25',
        username: 'lina',
    }
];

// home page
app.get('/', (req, res) => {
    return res.render('Homepage', {
        data: listPosts,
    })
})
//add task 
app.get('/add', (req , res) => {
    return res.render('add');
});
app.post('/add', (req, res) => {
    const { task ,date, username } = req.body ;
    const id = Math.floor(Math.random() * 1000);
    listPosts.push({
        id,
        task,
        date,
        username,
    });
    return res.redirect('/');
});
//delete task 
app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = listPosts.findIndex(post => post.id == id);
    listPosts.splice(index, 1);
    return res.redirect('/');
});
//update task 
app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const post = listPosts.find(post => post.id == id);
    return res.render('update', {
        post,
    });
});

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task, date, username} = req.body;
    const index = listPosts.findIndex(post => post.id == id);
    listPosts[index] = {
        id,
        task,
        date,
        username,
    };
    
    return res.redirect('/');
});

//start 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});