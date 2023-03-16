module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		let activities = ['Github: https://github.com/MasterChad/bibi-tools-osint'], i = 0;
		setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: "LISTENING" }), 1000);
	}
};
