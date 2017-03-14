var nodemailer = null;
var transport = null;

module.exports = function sendEmail(config, deggre, humidity) {
	if(!config.mailhost) return;
	if(nodemailer == null){
		nodemailer = require('nodemailer');
		transport = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: config.mailuser,
		        pass: config.mailpass
		    }
		});
	}
	
    const mailOptions = {
        from: config.mailuser,
        to: config.mailaddr,
        subject: 'Status ' + deggre + 'C ' + humidity + '%',
        html: 'Status ' + deggre + 'C ' + humidity + '%'
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};