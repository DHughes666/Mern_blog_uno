require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const ejs = require("ejs");
const _ = require('lodash');

const atlasUsername = process.env.MONGODB_ATLAS_USERNAME;
const atlasPassword = process.env.MONGODB_ATLAS_PASSWORD;
const atlasClusterUrl = process.env.MONGODB_ATLAS_CLUSTER_URL;

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasClusterUrl}`, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log("CONNECTION OPEN!!!");
}).catch(err => {
  console.log("OH NO ERROR!!!");
  console.log(err);
})

const homeStartingContent = "Welcome to our blog dedicated to the remarkable journey of aging. Life's path presents us with a series of chapters, and each new phase brings its own set of challenges and opportunities. As we gracefully embrace the later chapters of life, it's essential to equip ourselves with knowledge, resources, and a supportive community. " +

"Aging is a natural process, yet it often comes with unique hurdles that can catch us off guard. Physical changes, shifting social dynamics, and evolving healthcare needs can leave us seeking guidance and solutions. But remember, with every challenge, there's an opportunity to learn, adapt, and thrive." +

"Our blog is here to shed light on these challenges and provide you with practical solutions that empower you to make informed decisions. From managing health concerns to staying socially engaged, we're committed to exploring a wide range of topics that impact the aging experience. Our expert contributors will share insights, research, and personal stories that inspire resilience and personal growth.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



const getDate = () => {
  const today = new Date();

  const options = {
    weekday: "long",
    day: 'numeric',
    month: "long",
    year: "numeric"
  };

  return today.toLocaleDateString("en-US", options);
}

const blogSchema = new mongoose.Schema({
  title: {type: String, required: [true, 'Please provide a title']},
  subtitle: {type: String, required: [true, 'Please provide a title']},
  body: {type: String, required: [true, 'Please provide a title']},
  author: {type: String, required: [true, 'Please provide a title']},
  date: {type: String, required: [true, 'Please provide a title']}
})

const aboutSchema = new mongoose.Schema({
  content: String
})

const contactSchema = new mongoose.Schema({
  content: String
})

const Blog = mongoose.model("Blog", blogSchema)
const Contact = mongoose.model("Contact", contactSchema)
const About = mongoose.model("About", aboutSchema)

const home1 = new Blog({
  title: "Aging Well",
  subtitle: "Aging is a masterpiece of human evolution. " + 
            "It's the culmination of years lived, lessons learned, "+
            "and stories written on the canvas of our lives. Embracing "+
            "the journey with grace allows us to savor the wisdom and "+
            "beauty that comes with each passing year.",
  body: "Aging is the chapter where time becomes the "+
        "ink that etches tales of resilience, adventures, "+
        "and growth onto the parchment of our souls. "+
        "Just like a fine wine ages gracefully, we too "+
        "gather the richness of experience, the warmth of "+
        "cherished memories, and the elegance of wisdom. "+
        "Embracing the journey of aging with grace allows us "+
        "to appreciate the unique masterpiece that our lives "+
        "become—each line and wrinkle a testament to "+
        "the extraordinary story we've woven.",
  author: "Bala BluWay",
  date: getDate()
})

const home2 = new Blog({ 
  title: "Changing the World through Innovative Technologies",
  subtitle: "Technology is the canvas upon which we paint the future. "+
        "It's a tool that empowers us to bridge gaps, solve complex problems,"+
        " and create innovations that transform the way "+
        "we live, work, and connect with one another.",
  body: "In the grand mural of human progress, "+
        "technology is the brush that gives life to our boldest "+
        "visions. With each stroke of innovation, we paint a brighter "+
        "tomorrow, transcending barriers and reaching new horizons. "+
        "Just as a canvas captures an artist's imagination,"+
        " technology captures the brilliance of our human ingenuity."+
        " It's a bridge that unites minds across the globe, "+
        "an avenue through which we sculpt a world "+
        "that reflects our dreams and aspirations.",
  author: "Cara Bloom",
  date: getDate()
})

const home3 = new Blog({
  title: "Wellnes",
  subtitle: "Wellness is a holistic approach to "+
            "living that encompasses the well-being of "+
            "the body, mind, and soul. It's about nurturing "+
            "not only our physical health but also cultivating "+
            "joy, inner peace, and meaningful connections that enrich our lives.",
  body: "Wellness is a symphony where our body, mind,"+
        " and soul harmonize to create a melody of thriving. "+
        "It's not just about the foods we eat or the exercises "+
        "we do; it's a melody that resonates with laughter,"+
        " mindfulness, and the nurturing of our relationships. "+
        "Like a garden, we cultivate our well-being with intention "+
        "and care, tending to the blooms of happiness and sowing the "+
        "seeds of resilience. Wellness is the orchestra of life that"+
        " reminds us that true health is a tapestry woven with self-love and balance.",
  author: "Manga Ghiome",
  date: getDate()
})

let defaultHome = [home1, home2, home3]

app.get('/', function(req, res){
  const shortenText = (text, maxLength) => {
    if (text.length > maxLength){
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
  
  Blog.find().then((blogItems) => {
    if (blogItems.length === 0) {
      Blog.insertMany(defaultHome)
      .then(() => console.log("Success"))
      .catch((error) => console.log(error))
      res.render('home', {'homeCont': homeStartingContent,
      'title': '',});
    } else {
      res.render('home', {'homeCont': homeStartingContent,
      'title': '',
      'blogItems': blogItems});
    }
  });

});


app.get('/about', function(req, res){
  res.render('about', {'aboutCont': aboutContent, 'title': ' | About'})
});

app.post('/compose', function(req, res){

    tit = req.body.postTitle;

  newBloggy = new Blog({
    title: tit,
    subtitle: req.body.postSubTitle,
    body: req.body.postBody,
    author: req.body.postAuthor,
    date: getDate()
  })

  if(tit !== '') {
    newBloggy.save().then(() => console.log("Database updated"))
    res.redirect('/');
  } else {
    res.redirect('/compose')
  }});

app.get('/compose', function(req, res){
  res.render('compose', {'title': ' | Compose'});
});

app.get('/contact', function(req, res){
  res.render('contact', {'contCont': contactContent, 'title': ' | Contact'})
});


app.get('/posts/:topic', function(req, res){
  const paramTitle = _.lowerCase(req.params.topic);

  Blog.find().then((foundBlog) => {
    foundBlog.forEach((blog) => {
      storedTitle = _.lowerCase(blog.title);

      if (storedTitle === paramTitle) {
        res.render("post", {'title': blog.title, 'content': blog.body,
        'subcontent': blog.subtitle, 'author': blog.author, 'date': blog.date})
      }
    })
  })

});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
