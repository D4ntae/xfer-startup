import express from "express"
import cors from "cors"
import path from "path"
import sqlite3 from "sqlite3"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

const app = express();
const PORT = 3000;
const db = new sqlite3.Database("./users.db")

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json()); // Support URL-encoded bodies
app.use(cookieParser());

// Simulate a list of blog posts as an in-memory array
const blogPosts = [
    {id: 0, title: 'The Flag', content: "XFER{Must_B3_ID0R_0n_Th3_Br41n}"},
    { id: 1, title: 'Navy Seal meme', content: "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo." },
    { id: 2, title: 'Lorem Ipsum something something', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    { id: 3, title: 'GNU + Linux', content: "I'd just like to interject for a moment. What you're refering to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX. Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project. There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!" },
];

// Route to fetch all blog posts
app.get('/api/blog/all', (req, res) => {
    res.json(blogPosts.toSpliced(0, 1));
});

// Route to fetch a single blog post by ID
app.get('/api/blog/post/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const blogPost = blogPosts.find(post => post.id === postId);

    if (blogPost) {
        res.json(blogPost);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.post('/api/download', (req, res) => {
    const fileName = req.body.file; // Get the file name from the request body

    if (!fileName) {
        return res.status(400).json({ message: 'No file specified' });
    }

    if (fileName.includes(".")) {
        return res.status(400).json({ message: 'Invalid file' });
    }
    const __dirname = path.resolve();
    const filePath = path.join(__dirname, 'files', fileName); // Adjust the path to your files folder

    // Download the file
    res.download(filePath, filePath, (err) => {
        if (err) {
          console.error('Error during file download:', err);
          res.status(500).send('Error occurred while downloading the file');
        } else {
          console.log('File successfully downloaded');
        }
    });

});

const generateSessionToken = (username) => {
  return jwt.sign({ username }, 'your-secret-key', { expiresIn: '1d' });
};

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    const q = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "';";
    db.get(q, async (err, row) => {
        if (err) {
            console.log(err)
          return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (!row) {
          // If no user is found
          return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const sessionToken = generateSessionToken(username);
        return res.status(200).cookie('session_token', sessionToken, {
            sameSite: 'lax',
            secure: false,    // Set to true if using HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration (1 day in milliseconds)
        }).send();
      });
});

const isValidSessionToken = (token) => {
  try {
    jwt.verify(token, 'your-secret-key');
    return true;
  } catch (err) {
    return false;
  }
};

// Middleware to check for authentication
const requireAuth = (req, res, next) => {
    console.log(req.cookies)
  const sessionToken = req.cookies.session_token;

  if (!sessionToken) {
    return res.status(403).json({ success: false, message: 'Access denied: No session token' });
  }

  // You can further validate the session token here (e.g., check against a session store or JWT verification)
  if (isValidSessionToken(sessionToken)) {
    next(); // Token is valid, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({ success: false, message: 'Access denied: Invalid session token' });
  }
};

app.get("/api/dashboard", requireAuth, (req, res) => {
    res.json({
        "flag": "XFER{S1gn_0f_Th3_0ld_T1m3s}"
    })
})



app.post('/api/submit', (req, res) => {
    const flags = {
        "XFER{Must_B3_ID0R_0n_Th3_Br41n}": 0,
        "XFER{W1sh_Y0u_W3r3_LFI}": 1,
        "XFER{S1gn_0f_Th3_0ld_T1m3s}": 2,
        "XFER{4ll_1_4sk_1s_4_l1c3nc3}": 3,
        "XFER{L1c3nc4_0d_m1l1un_d0l4r4}": 4,
        "XFER{M4m4_n4p0k0n_s4m_pwn40}": 5
    }
    console.log("Body: ", req.body)
  const { flag } = req.body; // Destructure the 'flag' field from the request body

  if (!flag) {
    return res.status(400).json({ error: 'Flag is required' });
  }

  if (flag in flags) {
    return res.status(200).json({ index: flags[flag]});
  } 

  // Send a success response
  return res.status(400).json({ message: 'Invalid flag' });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

