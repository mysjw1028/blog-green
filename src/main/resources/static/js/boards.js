$("#btnDelete").click(() => {
	deleteById();
});

// 하트 아이콘을 클릭했을때의 로직
$("#iconLove").click(() => {
	let isLovedState = $("#iconLove").hasClass("fa-solid");
	if (isLovedState) {
		deleteLove();
	} else {
		insertLove();
	}
});

$("#btnSave").click(() => {
	save();
	//saveTest();
});

//updateForm
$("#btnUpdate").click(() => {
	update();
});

function deleteById() {
	let id = $("#id").val();

	let page = $("#page").val();
	let keyword = $("#keyword").val();

	$.ajax("/s/api/boards/" + id, {
		type: "DELETE",
		dataType: "json" // 응답 데이터
	}).done((res) => {
		if (res.code == 1) {
			//location.href = document.referrer;
			location.href = "/?page=" + page + "&keyword=" + keyword;  //  /?page=?&keyword=?
		} else {
			alert("글삭제 실패");
		}
	});
}
// DB에 insert 요청하기
function insertLove() {
	let id = $("#id").val();

	$.ajax("/s/api/boards/" + id + "/loves", {
		type: "POST",
		dataType: "json"
	}).done((res) => {
		if (res.code == 1) {
			renderLoves();
			// 좋아요 수 1 증가
			let count = $("#countLove").text();
			$("#countLove").text(Number(count) + 1);
			$("#lovesId").val(res.data.id);
		} else {
			alert("좋아요 실패했습니다");
		}
	});
}

// DB에 delete 요청하기
function deleteLove() {//delete는 바디 데이터가 없다
	let id = $("#id").val();
	let lovesId = $("#lovesId").val();

	$.ajax("/s/api/boards/" + id + "/loves/" + lovesId, {
		type: "DELETE",
		dataType: "json"
	}).done((res) => {//res를 자바스크립트로 바꿔치기한다-> 통신이 끝나면
		if (res.code == 1) {//빈 하트로 바꾸기- > 바꾸는 그림그리느거야
			renderCancelLoves();
			let count = $("#countLove").text();//좋아요 카운트를 가져와서 그 값에 -1 -> 통신이 성공하고 넣어야해서 아해
			$("#countLove").text(Number(count) - 1);
		} else {
			alert("좋아요 취소에 실패했습니다");
		}
	});
}
// 빨간색 하트 그리기
function renderLoves() {
	$("#iconLove").removeClass("fa-regular");
	$("#iconLove").addClass("fa-solid");
}

// 검정색 하트 그리기
function renderCancelLoves() {
	$("#iconLove").removeClass("fa-solid");
	$("#iconLove").addClass("fa-regular");
}


function save() {
	let data = {
		title: $("#title").val(),
		content: $("#content").val()
	};

	$.ajax("/s/api/boards", {
		type: "POST",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/";
		}
	});
}

function update() {
	let data = {
		title: $("#title").val(),
		content: $("#content").val()
	};

	let id = $("#id").val();

	$.ajax("/s/api/boards/" + id, {
		type: "PUT",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("게시글 수정 완료");
			location.href = "/boards/" + id;
		} else {
			alert("업데이트에 실패하였습니다");
		}
	});
}


