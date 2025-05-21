const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

const Track = require('./models/track.js')

const { Op } = require('sequelize') 


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())


//http://localhost:3001/api/search?term=abc
//req.query is like 
{
    term: 'abc'
}

app.get('/api/search', async (req, res) => {
    const term = req.query['term']
    console.log(term)

    if (!term){
      res.send(await Track.findAll())
      return
    }

    const allTracks = await Track.findAll({
      where: {
        name: {
          [Op.like]: `%${term}%`  
        }
      }
    })
    console.log("allTracks", allTracks)

    res.send(allTracks)
});

app.get('/api/db_sync', (req, res) => {
    Track.sync({ alter: true })
        .then(() => {
            console.log('Database & tables created!');
            res.send('Database & tables created!');
        })
        .catch(err => {
            console.error('Error creating database & tables:', err);
            res.status(500).send('Error creating database & tables');
        });
    res.send('Database & tables created!');
})


// ------------ Create SSH tunnel and start server --------------


const { createTunnel } = require('tunnel-ssh');

const tunnelOptions = { autoClose: true };
const serverOptions = { port: 3307 }; // local port to forward
const sshOptions = {
  host: '18.136.210.109',
  port: 22,
  username: 'ubuntu',
  privateKey: require('fs').readFileSync('/Users/yukingshing/Downloads/testing_key.pem')
};
const forwardOptions = {
  srcAddr: '127.0.0.1',
  srcPort: 3307,
  dstAddr: 'database-1.ctuas04ew5ro.ap-southeast-1.rds.amazonaws.com',
  dstPort: 3306
};

createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions)
  .then(([server, conn]) => {
    console.log('SSH tunnel established');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
    // Now connect Sequelize to localhost:3307
    
    //   sequelize.authenticate()
    //     .then(() => console.log('Database connected through SSH tunnel'))
    //     .catch(err => console.error('Database connection error:', err));

  })
  .catch(err => {
    console.error('Tunnel error:', err);
  });
