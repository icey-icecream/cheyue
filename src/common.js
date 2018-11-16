const PROJECTNAME_ = '/cheyue/'

function checkResult(result){
	var message;
	switch (result.code) {
		case '0':
			if (result.data == 0) {
				message = '/register';
			} else if (result.data == 1) {
				message = '/login';
			} else if (result.data == 2) {
				message = '/authentication';
			} else if (result.data == 3) {
				message = '/myprogram';
			} else if (result.data == 4) {
				message = '/haveprogram';
			} else if (result.data == 5) {
				message = '/forget';
			} else if (result.data == 6) {
				message = '/phone';
			} else {
				message = '/login';
			}
			break;
		case '1' :
			message = result.message;
			break;
		case '2' :
			message = "当前登录失效或未登录，请重新登录！";
			break;
		default :
			message = result.message;
	}
	return message;
}

module.exports = {
	projectName_: PROJECTNAME_,
	checkResult: checkResult
}