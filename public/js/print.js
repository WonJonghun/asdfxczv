var renderedImg = new Array;

var contWidth = 200, // 너비(mm) (a4에 맞춤)
    padding = 5; //상하좌우 여백(mm)

function print_page() { //이미지를 pdf로 만들기
    // document.getElementById("loading").style.display = "block"; //로딩 시작

    $('.rectangle').removeClass('select');
    $('tr').removeClass('tr_select');
    var lists = document.querySelectorAll("#print_area > .panel_div"),
        deferreds = [],
        doc = new jsPDF("p", "mm", "a4"),
        listsLeng = lists.length;

    for (var i = 0; i < listsLeng; i++) { // li 개수만큼 이미지 생성
        var deferred = $.Deferred();
        deferreds.push(deferred.promise());
        generateCanvas(i, doc, deferred, lists[i]);
    }

    $.when.apply($, deferreds).then(function () { // 이미지 렌더링이 끝난 후
        var sorted = renderedImg.sort(function (a, b) { return a.num < b.num ? -1 : 1; }), // 순서대로 정렬
            curHeight = padding, //위 여백 (이미지가 들어가기 시작할 y축)
            sortedLeng = sorted.length;

        for (var i = 0; i < sortedLeng; i++) {
            var sortedHeight = sorted[i].height, //이미지 높이
                sortedImage = sorted[i].image; //이미지

            if (curHeight + sortedHeight > 297 - padding * 2) { // a4 높이에 맞게 남은 공간이 이미지높이보다 작을 경우 페이지 추가
                doc.addPage(); // 페이지를 추가함
                curHeight = padding; // 이미지가 들어갈 y축을 초기 여백값으로 초기화
                doc.addImage(sortedImage, 'jpeg', padding, curHeight, contWidth, sortedHeight); //이미지 넣기
                curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
            } else { // 페이지에 남은 공간보다 이미지가 작으면 페이지 추가하지 않음
                doc.addImage(sortedImage, 'jpeg', padding, curHeight, contWidth, sortedHeight); //이미지 넣기
                curHeight += sortedHeight; // y축 = 기존y축 + 새로들어간 이미지 높이
            }
        }
        doc.save('report.pdf'); //pdf 저장

        // document.getElementById("loading").style.display = "none"; //로딩 끝
        curHeight = padding; //y축 초기화
        renderedImg = new Array; //이미지 배열 초기화
    });
}

function generateCanvas(i, doc, deferred, curList) { //페이지를 이미지로 만들기
    var pdfWidth = $(curList).outerWidth() * 0.2645, //px -> mm로 변환
        pdfHeight = $(curList).outerHeight() * 0.2645,
        heightCalc = contWidth * pdfHeight / pdfWidth; //비율에 맞게 높이 조절
    html2canvas(curList).then(
        function (canvas) {
            var img = canvas.toDataURL('image/jpeg', 1.0); //이미지 형식 지정
            renderedImg.push({ num: i, image: img, height: heightCalc }); //renderedImg 배열에 이미지 데이터 저장(뒤죽박죽 방지)     
            deferred.resolve(); //결과 보내기
        }
    );
}