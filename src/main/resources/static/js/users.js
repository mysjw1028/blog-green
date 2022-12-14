let isUsernameSameCheck = false;

$("#btnJoin").click(() => {
	join();
});

$("#btnUsernameSameCheck").click(() => {
	checkUsername();
});

$("#btnLogin").click(() => {
	login();
});


$("#btnDelete").click(() => {
	resign();
});

$("#btnUpdate").click(() => {
	update();
});


function join() {
	if (isUsernameSameCheck == false) {
		alert("유저네임 중복 체크를 진행해주세요");
		return;
	}

	if (koreanCheck() == true) {
		alert("유저네임에 한글이 있으면 안됩니다.");
		return;
	}


	if (engCheck() == true) {
		alert("대문자 하나 이상 넣어주세요")
		return;
	}


	if (engCheck() == true) {
		alert("대문자 하나 이상 넣어주세요")
		return;
	}

	if (pwCheck(passwordSame) == false) {
		alert("비밀번호가 다릅니다")
		return;
	}
	if (emailCheck() == false) {
		alert("이메일 형식을 확인해주세요")
		return;
	}


	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val()
	};

	$.ajax("/api/join", {
		type: "POST",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/loginForm";
		} else {
			alert(res.msg);
			history.back();
		}
	});
}

function checkUsername() {
	let username = $("#username").val();

	$.ajax(`/api/users/usernameSameCheck?username=${username}`, {
		type: "GET",
		dataType: "json",
		async: true
	}).done((res) => {
		if (res.code == 1) { // 통신 성공
			if (res.data == false) {
				alert("아이디가 중복되지 않았습니다.");
				isUsernameSameCheck = true;
			} else {
				alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요.");
				isUsernameSameCheck = false;
				$("#username").val("");
			}
		}
	});
}

function login() {
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		remember: $("#remember").prop("checked")
	};

	$.ajax("/api/login", {
		type: "POST",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/";
		} else {
			alert("로그인 실패, 아이디 패스워드를 확인해주세요");
		}
	});
}

function resign() {
	let id = $("#id").val();

	$.ajax("/s/api/users/" + id, {
		type: "DELETE",
		dataType: "json" // 응답 데이터
	}).done((res) => {
		if (res.code == 1) {
			alert("회원탈퇴 완료");
			location.href = "/";
		} else {
			alert("회원탈퇴 실패");
		}
	});
}

function update() {
	let data = {
		password: $("#password").val(),
		email: $("#email").val()
	};

	let id = $("#id").val();

	$.ajax("/s/api/users/" + id, {
		type: "PUT",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("회원 수정 완료");
			location.reload(); // f5
		} else {
			alert("업데이트에 실패하였습니다");
		}
	});
}

function koreanCheck() {
	let username = $("#username").val();
	var korRule = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	if (korRule.test(username)) {
		return true;
	} else {
		return false;
	}
}//회원가입 조인

function engCheck() {//대문자 1개 
	let username = $("#username").val();
	let egRule = /[A-Z]/;
	if (!egRule.test(username)) {
		return true;
	} else {
		return false;
	}
}

function pwCheck() {
	let password = $("#password").val();
	let passwordSame = $("#passwordSame").val();
	if (password != passwordSame) {
		return false;
	} else {
		return true;
	}
}
function emailCheck() {
	let email = $("#email").val();
	let emailRule = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	if (emailRule.test(email)) {
		return true;
	} else {
		return false;
	}
}

