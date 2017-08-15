function adminController(adminService, UserInfoService, userPageService) {

	var vm = this;
	vm.users = [];
	vm.show = true;
	vm.stats = false;

	vm.toggleStats = function() {
		vm.show = !vm.show;
		vm.stats = false;
	};
	// START mentorsMentees
	vm.mentorsMentees = function() {
		adminService.getMentorsMentees().then(function() {
			vm.users = adminService.users;
			vm.users.forEach(function(user) {
				if (user.access_lvl === 1) {
					user.access_lvl = 'Mentor';
					return user.access_lvl;
				} else if (user.access_lvl === 2) {
					user.access_lvl = 'Mentee';
					return user.access_lvl;
				} //end of conditional statement
			}); //end of loop
			for (var i = 0; i < vm.users.length; i++) {
				vm.enabled = vm.users[i].enabled;
			}
		}); //end of promise
	};
	// END mentorsMentees
	// START switchEnabled
	vm.switchEnabled = function(index) {
		var enabled = vm.users[index].enabled;
		enabled = !enabled;
		adminService.switchUserEnabled(vm.users[index]);
	};
	// END switchEnabled


	// START displayUserModal
	vm.displayUserModal = function(index) {
		vm.userInModal = vm.users[index];
	};
	// END displayUserModal


	// START goToUserPage
	vm.goToUserPage = function() {
		vm.userToLogIn = vm.userInModal;
		UserInfoService.seeOtherUsersPage(vm.userToLogIn);
		window.location.href = '#!/visit';
	};
	// END goToUserPage


	// START searchUser
	vm.search = function() {
		adminService.getMentorsMentees().then(function() {
			vm.typeUserSearch = adminService.users;
			searchDatabase(vm, vm.users);
			vm.users.forEach(function(user) {
				if (user.access_lvl === 1) {
					user.access_lvl = 'Mentor';
					return user.access_lvl;
				} else if (user.access_lvl === 2) {
					user.access_lvl = 'Mentee';
					return user.access_lvl;
				} //end of conditional statement
			}); //end of loop
		}); //end of promise
	};
	// END searchUser


	// START getMatches
	vm.getMatches = function(index) {
		var userToMatch = {
			email: vm.users[index].email,
			type: vm.users[index].access_lvl,
			asia: vm.users[index].asia_score,
			ed_lvl: vm.users[index].ed_lvl,
			gender: vm.users[index].gender,
			matched: vm.users[index].matched,
			pets: vm.users[index].pets,
			sci_age: vm.users[index].sci_age,
			rel_status: vm.users[index].rel_status,
			sci_cause: vm.users[index].sci_cause,
			zip: vm.users[index].zip,
			lang: vm.users[index].lang,
			fam_status: vm.users[index].fam_status,
			age: vm.users[index].age
		};
		adminService.matchingUsers(userToMatch).then(function() {
			vm.matchContent = adminService.matchedUsers;
		});
	};
	// END getMatches


	// START logout
	vm.logout = function() {
		adminService.logout();
	};
	// END logout

	vm.showMatchUser = function(index) {
		vm.showMatchedUserInfo = vm.matchContent[index];

		UserInfoService.seeOtherUsersPage(vm.showMatchedUserInfo);
		window.location.href = '#!/visit';


	}; //showMatchUser

	vm.deleteThisUser = function(index) {
		var userToErase = vm.users[index].email;
		userPageService.deleteUser(userToErase);


	}; //end of delete THis user

	var myChart = document.getElementById('myChart').getContext('2d');
	var barChart = document.getElementById('barChart').getContext('2d');
	var radarChart = document.getElementById('radarChart').getContext('2d');



	//global optionsch

	var mentorMenteeChart = new Chart(myChart, {
		type: 'pie', //bar horizantal, pie, line, dougnut, radar, polarArea
		data: {
			labels: ['Matched', 'Unmatched'],

			datasets: [{
				label: 'populations',
				data: [442, 112],
				backgroundColor: ['#9a252b'], //Only the first bar gets set
				borderColor: [],
				borderWidth: 1

			}]
		},
		options: {}

	});

	var genderChart = new Chart(barChart, {
		type: 'bar', //bar horizantal, pie, line, dougnut, radar, polarArea
		data: {
			labels: ['Men', 'Women', 'Prefer Not To Say', 'Other'],

			datasets: [{
				label: 'Gender',
				data: [244, 254, 10, 0],
				backgroundColor: ['#999', "#9a252b", 'black', 'green'], //Only the first bar gets set
				borderColor: [],
				borderWidth: 1

			}]
		},
		options: {}

	});
	var matchedAndUnmatchedChart = new Chart(radarChart, {
		type: 'doughnut', //bar horizantal, pie, line, dougnut, radar, polarArea
		data: {
			labels: ['Mentors', 'Mentees', 'Admins'],

			datasets: [{
				label: 'Mentors/Mentees/Admins',
				data: [250, 246, 6],
				backgroundColor: ['#999', "#9a252b", 'black'], //Only the first bar gets set
				borderColor: [],
				borderWidth: 1

			}]
		},
		options: {}

	});

} //end of controller

function searchDatabase(vm) {

	var usersFound = [];
	for (var i = 0; i < vm.typeUserSearch.length; i++) {
		for (var x in vm.typeUserSearch[i]) {
			if (vm.searchUserBy.toLowerCase() === String(vm.typeUserSearch[i][x]).toLowerCase()) {

				usersFound.push(vm.typeUserSearch[i]);
				vm.users = usersFound;
			}
		}
	}

	return vm.users;
}
