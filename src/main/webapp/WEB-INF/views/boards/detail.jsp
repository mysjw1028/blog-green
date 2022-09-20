<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="../layout/header.jsp"%>

<input id="page" type="hidden" value="${sessionScope.referer.page}">
<input id="keyword" type="hidden"
	value="${sessionScope.referer.keyword}">
<div class="container">
	<br /> <br /> 
	<input id="id" type="hidden" value="${detailDto.id}" /><!--제이쿼리로 쓸려고 -> 심어놓고 댕기기-->
	<input id="lovesId" type="hidden" value="${detailDto.lovesId}" />

	<div class="d-flex">

		<a href="/boards/${detailDto.id}/updateForm" class="btn btn-warning">수정하러가기</a>

		<form>
			<button id="btnDelete" class="btn btn-danger">삭제</button>
		</form>
	</div>


	<br />
	<div class="d-flex justify-content-between">
		<h3>${detailDto.title}</h3>
		<div>
			좋아요수 : <span id="countLove">${detailDto.loveCount}</span> <i
				id="iconLove"
				class='${detailDto.loved ? "fa-solid" : "fa-regular"} fa-heart my_pointer my_red'></i>
		</div>
	</div>
	<hr />

	<div>${detailDto.content}</div>
</div>

<script>

	$("#btnDelete").click(()=>{
		deleteById();
	});
	
	function deleteById(){
		let id = $("#id").val();
		
		let page = $("#page").val();
		let keyword = $("#keyword").val();
		
		$.ajax("/boards/" + id, {
			type: "DELETE",
			dataType: "json" // 응답 데이터
		}).done((res) => {
			if (res.code == 1) {
				//location.href = document.referrer;
				location.href = "/?page="+page+"&keyword="+keyword;  //  /?page=?&keyword=?
			} else {
				alert("글삭제 실패");
			}
		});
	}
	

	// 하트 아이콘을 클릭했을때의 로직
	$("#iconLove").click(()=>{
		let isLovedState = $("#iconLove").hasClass("fa-solid");
		if(isLovedState){
			deleteLove();
		}else{
			insertLove();
		}
	});
	
	// DB에 insert 요청하기
	function insertLove(){
		let id = $("#id").val();
		
		$.ajax("/boards/"+id+"/loves", {
			type: "POST",
			dataType: "json"
		}).done((res) => {
			if (res.code == 1) {
				renderLoves();
				// 좋아요 수 1 증가
				let count = $("#countLove").text();
				$("#countLove").text(Number(count)+1);
				$("#lovesId").val(res.data.id);
			}else{
				alert("좋아요 실패했습니다");
			}
		});
	}
	
	// DB에 delete 요청하기
	function deleteLove(){//delete는 바디 데이터가 없다
      let id = $("#id").val();
      let lovesId = $("#lovesId").val();
      
      $.ajax("/boards/"+id+"/loves/"+lovesId, {
         type: "DELETE",
         dataType: "json"
      }).done((res) => {//res를 자바스크립트로 바꿔치기한다-> 통신이 끝나면
         if (res.code == 1) {//빈 하트로 바꾸기- > 바꾸는 그림그리느거야
            renderCancelLoves();
            let count = $("#countLove").text();//좋아요 카운트를 가져와서 그 값에 -1 -> 통신이 성공하고 넣어야해서 아해
            $("#countLove").text(Number(count)-1);
         }else{
            alert("좋아요 취소에 실패했습니다");
         }
      });
   }	
	// 빨간색 하트 그리기
	function renderLoves(){
		$("#iconLove").removeClass("fa-regular");
		$("#iconLove").addClass("fa-solid");
	}
	
	// 검정색 하트 그리기
	function renderCancelLoves(){
		$("#iconLove").removeClass("fa-solid");
		$("#iconLove").addClass("fa-regular");
	}

</script>

<%@ include file="../layout/footer.jsp"%>

