const token = ((req, res) => {
  res.sendFile(__dirname + '/loaderio-5d886566a4788d7b18a783b471e05e20.txt');
});

module.exports = { token };