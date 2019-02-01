const PHP_URL = "http://ilatih.com/backend/scripts/";
var lecturers = {};
var courseIndex = -1;
var courseName = "";
var babImgURL = "";
var babIndex = -1;
var babName = "";

$(document).ready(function () {
    setCheckBoxListener();
    $("#course-panel-selector").on("click", function () {
        $("#questions-panel").css("display", "none");
        $("#questions-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "none");
        $("#bab-panel-selector").removeClass("active");
        $("#course-panel").css("display", "block");
        $("#course-panel-selector").addClass("active");
        getCourses();
    });
    $("#questions-panel-selector").on("click", function () {
        $("#course-panel").css("display", "none");
        $("#course-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "none");
        $("#bab-panel-selector").removeClass("active");
        $("#questions-panel").css("display", "block");
        $("#questions-panel-selector").addClass("active");
    });
    $("#bab-panel-selector").on("click", function () {
        $("#course-panel").css("display", "none");
        $("#course-panel-selector").removeClass("active");
        $("#questions-panel").css("display", "none");
        $("#questions-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "block");
        $("#bab-panel-selector").addClass("active");
        getDaftarBab();
    });
    setDeleteCourseListener();
    $("#show-courses").on("click", function() {
        if ($("#courses-2").css("display") == "none") {
            $("#courses-2").css("display", "flex");
        } else {
            $("#courses-2").css("display", "none");
        }
    });
    $("#add-question-show-courses").on("click", function() {
        if ($("#add-question-courses").css("display") == "none") {
            $("#add-question-courses").css("display", "flex");
        } else {
            $("#add-question-courses").css("display", "none");
        }
    });
    $("#add-question-show-babs").on("click", function() {
        if ($("#add-question-babs").css("display") == "none") {
            $("#add-question-babs").css("display", "flex");
        } else {
            $("#add-question-babs").css("display", "none");
        }
    });
    // Show courses in #show-courses
    loadCoursesIntoShowCoursesOption();
    // Show courses in #add-question-show-courses
    loadCourses2();
    // Show bab in #add-question-babs
    loadBabs();
    $("#add-bab").on("click", function() {
        $("#bab-name").val("");
        $("#add-bab-dialog").css("height", "225px");
        $("#add-bab-error").css("display", "none");
        $("#add-bab-dialog-ctr").css("display", "flex");
    });
    $("#add-bab-img-ctr").on({
        mouseenter: function() {
            $("#add-bab-img-overlay").css("background-color", "rgba(0, 0, 0, 0.5)");
            $("#add-bab-img-btn").css("opacity", "1");
        },
        mouseleave: function() {
            $("#add-bab-img-overlay").css("background-color", "rgba(0, 0, 0, 0)");
            $("#add-bab-img-btn").css("opacity", "0");
        }
    });
    $("#select-bab-img").on("change", function() {
        var fr = new FileReader();
        fr.onload = function(e) {
            var imgData = fr.result;
            var formData = new FormData();
            formData.append('img_data', imgData);
            $.ajax({
                type: 'POST',
                url: PHP_URL+'upload-img.php',
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function(a) {
                    var imgFileName = a;
                    babImgURL = "http://ilatih.com/backend/userdata/imgs/"+imgFileName;
                    document.getElementById("bab-img").src = babImgURL;
                },
                error: function(a, b, c) {

                }
            });
        };
        fr.readAsDataURL($(this).prop("files")[0]);
    });
});

function loadCoursesIntoShowCoursesOption() {
    courseIndex = -1;
    babImgURL = "";
    courseName = "";
    $.ajax({
        type: 'GET',
        dataType: 'text',
        url: PHP_URL+'get-courses.php',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var courses = JSON.parse(a);
                for (var i=0; i<courses.length; i++) {
                    var course = courses[i];
                    addCourseToShowCoursesOption(course.name, course.lecturer);
                }
                $(".show-courses-item").on("click", function() {
                    courseIndex = $(this).index();
                    courseName = courses[courseIndex].name;
                    $("#choose-course").html(courseName);
                });
            }
        },
        error: function(a, b, c) {

        }
    });
}

function loadCourses2() {
    courseIndex = -1;
    babImgURL = "";
    courseName = "";
    $.ajax({
        type: 'GET',
        dataType: 'text',
        url: PHP_URL+'get-courses.php',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var courses = JSON.parse(a);
                for (var i=0; i<courses.length; i++) {
                    var course = courses[i];
                    addCourse2(course.name, course.lecturer);
                }
                $(".show-courses-item").on("click", function() {
                    courseIndex = $(this).index();
                    courseName = courses[courseIndex].name;
                    $("#add-question-choose-course").html(courseName);
                });
            }
        },
        error: function(a, b, c) {

        }
    });
}

function cancelAddingQuestion() {
    $("#add-question-dialog-ctr").css("display", "none");
    babIndex = -1;
    babName = "";
    $("#add-question-choose-course").html("Pilih mata kuliah");
    $("#add-question-choose-bab").html("Pilih bab");
}

function addQuestion() {
    $("#add-question-dialog").css("height", "225px");
    $("#add-question-error").css("display", "none");
    if (courseIndex == -1) {
        $("#add-question-dialog").css("height", "250px");
        $("#add-question-error").html("Mohon pilih mata kuliah");
        $("#add-question-error").css("display", "block");
        return;
    }
    if (babIndex == -1) {
        $("#add-question-dialog").css("height", "250px");
        $("#add-question-error").html("Mohon pilih bab sebelum melanjutkan");
        $("#add-question-error").css("display", "block");
        return;
    }
}

function loadBabs() {
    babIndex = -1;
    babName = "";
    $.ajax({
        type: 'GET',
        url: PHP_URL+'get-bab.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var babs = JSON.parse(a);
                for (var i=0; i<babs.length; i++) {
                    var bab = babs[i];
                    var div = document.createElement("li");
                    div.setAttribute("class", "list-item show-babs-item");
                    div.setAttribute("style", "cursor: pointer;");
                    var img = document.createElement("img");
                    if (bab.img_url === '') {
                        img.src = "http://ilatih.com/backend/img/bab-placeholder.jpg";
                    } else {
                        img.src = bab.img_url;
                    }
                    img.setAttribute("width", "50px");
                    img.setAttribute("height", "50px");
                    img.setAttribute("style", "margin-left: 10px; margin-top: 5px; margin-bottom: 5px; border-radius: 5px;")
                    var name = document.createElement("div");
                    name.setAttribute("class", "show-babs-item-name");
                    name.setAttribute("style", "margin-left: 10px; margin-right: 10px; font-size: 18px;");
                    name.innerHTML = bab.name;
                    div.appendChild(img);
                    div.appendChild(name);
                    document.getElementById("add-question-babs").appendChild(div);
                }
                $(".show-babs-item").on("click", function() {
                    babIndex = $(this).index();
                    babName = babs[babIndex].name;
                    $("#add-question-choose-bab").html(babName);
                });
            }
        },
        error: function(a, b, c) {

        }
    });
}

function addCourseToShowCoursesOption(name0, lecturer0) {
    var div = document.createElement("li");
    div.setAttribute("class", "show-courses-item");
    var name = document.createElement("div");
    name.setAttribute("style", "margin-left: 10px; margin-right: 10px; font-size: 18px;");
    name.innerHTML = name0;
    var lecturer = document.createElement("div");
    lecturer.setAttribute("style", "margin-top: -5px; margin-left: 10px; margin-right: 10px; margin-bottom: 5px; font-size: 11px; color: #888888;");
    lecturer.innerHTML = lecturer0;
    div.appendChild(name);
    div.appendChild(lecturer);
    document.getElementById("courses-2").appendChild(div);
}

function addCourse2(name0, lecturer0) {
    var div = document.createElement("li");
    div.setAttribute("class", "show-courses-item");
    var name = document.createElement("div");
    name.setAttribute("style", "margin-left: 10px; margin-right: 10px; font-size: 18px;");
    name.innerHTML = name0;
    var lecturer = document.createElement("div");
    lecturer.setAttribute("style", "margin-top: -5px; margin-left: 10px; margin-right: 10px; margin-bottom: 5px; font-size: 11px; color: #888888;");
    lecturer.innerHTML = lecturer0;
    div.appendChild(name);
    div.appendChild(lecturer);
    document.getElementById("add-question-courses").appendChild(div);
}

function addNewBab() {
    $("#add-bab-dialog").css("height", "225px");
    $("#add-bab-error").css("display", "none");
    var name = $("#bab-name").val();
    if (name === '') {
        $("#add-bab-dialog").css("height", "265px");
        $("#add-bab-error").html("Mohon masukkan nama bab");
        $("#add-bab-error").css("display", "block");
        return;
    }
    if (courseIndex == -1) {
        $("#add-bab-dialog").css("height", "265px");
        $("#add-bab-error").html("Mohon pilih mata kuliah");
        $("#add-bab-error").css("display", "block");
        return;
    }
    $.ajax({
        type: 'GET',
        url: PHP_URL+'add-bab.php',
        data: {'name': name, 'course_name': courseName, 'img_url': babImgURL},
        dataType: 'text',
        success: function(a) {
            if (a == 0) {
                // Successs
                addBab(name, 0, babImgURL);
                courseName = "";
                courseIndex = -1;
                babImgURL = "";
                $("#add-bab-dialog-ctr").css("display", "none");
            } else {
                if (a == -2) {
                    // Bab already added
                    $("#add-bab-error").html("Maaf, nama bab sudah dipakai");
                } else if (a == -3) {
                    $("#add-bab-error").html("Maaf, mata kuliah yang dipilih tidak terdaftar");
                }
                $("#add-bab-dialog").css("height", "265px");
                $("#add-bab-error").css("display", "block");
            }
        },
        error: function(a, b, c) {

        }
    });
}

function addBab(name0, questionsCount, imgURL) {
    var div = document.createElement("div");
    div.setAttribute("class", "bab-item");
    var img = document.createElement("img");
    if (imgURL !== '') {
        img.src = imgURL;
    } else {
        img.src = "http://ilatih.com/backend/img/bab-placeholder.jpg";
    }
    img.setAttribute("width", "100%");
    img.setAttribute("height", "150px");
    img.setAttribute("style", "border-top-right-radius: 5px; border-top-left-radius: 5px;");
    var name = document.createElement("div");
    name.innerHTML = name0;
    name.setAttribute("style", "margin-left: 10px; margin-right: 10px;");
    var desc = document.createElement("div");
    desc.innerHTML = ""+questionsCount+" soal";
    desc.setAttribute("style", "font-size: 10px; color: #888888; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;");
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(desc);
    document.getElementById("babs").appendChild(div);
}

function getDaftarBab() {
    $("#babs").find("*").remove();
    $.ajax({
        type: 'GET',
        url: PHP_URL+'get-bab.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var jsonData = JSON.parse(a);
                var items = "";
                for (var i=0; i<jsonData.length; i++) {
                    var bab = jsonData[i];
                    var div = document.createElement("div");
                    div.setAttribute("class", "bab-item");
                    var img = document.createElement("img");
                    if (bab.img_url !== '') {
                        img.src = bab.img_url;
                    } else {
                        img.src = "http://ilatih.com/backend/img/bab-placeholder.jpg";
                    }
                    img.setAttribute("width", "100%");
                    img.setAttribute("height", "150px");
                    img.setAttribute("style", "border-top-right-radius: 5px; border-top-left-radius: 5px;");
                    var name = document.createElement("div");
                    name.innerHTML = bab.name;
                    name.setAttribute("style", "margin-left: 10px; margin-right: 10px;");
                    var desc = document.createElement("div");
                    desc.innerHTML = "0 soal";
                    $.ajax({
                        type: 'GET',
                        url: PHP_URL+"get-soal-by-bab.php",
                        data: {'bab_id': bab.id},
                        dataType: 'text',
                        cache: false,
                        success: function(a) {
                            if (a < 0) {
                                desc.innerHTML = "0 soal";
                                return;
                            }
                            var questionsCount = JSON.parse(a).length;
                            desc.innerHTML = ""+questionsCount+" soal";
                        },
                        error: function(a, b, c) {

                        }
                    });
                    desc.setAttribute("style", "font-size: 10px; color: #888888; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;");
                    div.appendChild(img);
                    div.appendChild(name);
                    div.appendChild(desc);
                    document.getElementById("babs").appendChild(div);
                    items += ("" +
                        "<div class='bab-item'>" +
                        "<div>"+bab.name+"</div>"+
                        "</div>"+
                        "");
                }
            }
        },
        error: function(a, b, c) {
            alert("Error loading daftar bab "+b+' '+c);
        }
    });
}

function setDeleteCourseListener() {
    $("#delete-course-btn").on("click", function () {
        $("#prompt-yes").html("YA");
        $("#prompt-no").html("TIDAK");
        $("#prompt-text").html("Apakah Anda yakin ingin menghapus mata kuliah ini?");
        $("#prompt-title").html("Hapus Mata Kuliah");
        $("#prompt").css("display", "block");
        $("#prompt-yes").on("click", function () {
            // Get all checked items
            var index = 0;
            var totalChecked = 0;
            $("#courses").find("tbody").find("*").each(function () {
                if ($(this).prop("tagName") === "INPUT") {
                    var inputIndex = index;
                    var checked = $(this).prop("checked");
                    if (checked) {
                        $.ajax({
                            type: 'GET',
                            dataType: 'text',
                            url: PHP_URL+'delete-course.php',
                            data: {'name': lecturers[index].name},
                            cache: false,
                            success: function (a) {
                                $("#prompt").css("display", "none");
                                alert(inputIndex);
                                deleteCourseFromList(inputIndex);
                            },
                            error: function (a, b, c) {
                                alert(b + ' ' + c);
                            }
                        });
                        totalChecked++;
                    }
                    index++;
                }
            });
        });
        $("#prompt-no").on("click", function () {
            $("#prompt").css("display", "none");
        });
    });
}

function setCheckBoxListener() {
    $('.check-all').on('click', function () {
        var checkBox = $(this).parent().find("input");
        var checked = checkBox.prop("checked");
        if (checked) {
            checked = false;
        } else {
            checked = true;
        }
        checkBox.prop("checked", checked);
        if (checked) {
            $(this).css("opacity", "1");
            checkAllCourses();
        } else {
            $(this).css("opacity", "0");
            uncheckAllCourses();
        }
        event.stopPropagation();
    });
}

function deleteCourseFromList(index) {
    $("#courses").find("tbody").find("tr:eq(" + index + ")").remove();
}

function setItemCheckBoxListener() {
    $("#courses").find("tbody").find("*").each(function () {
        if ($(this).attr("class") === "check-img") {
            $(this).on('click', function () {
                var checkBox = $(this).closest("tr").find("input");
                var checkBoxImg = $(this);
                checkBoxImg.css("opacity", "1");
                var checked = checkBox.prop("checked");
                if (checked) {
                    checked = false;
                } else {
                    checked = true;
                }
                checkBox.prop("checked", checked);
                if (checked) {
                    checkBoxImg.css("opacity", "1");
                } else {
                    checkBoxImg.css("opacity", "0");
                }
                var checked = false;
                // Check if there is any checkbox checked
                $("#courses").find("tbody").find("*").each(function () {
                    if ($(this).prop("tagName") === "INPUT") {
                        checked = $(this).prop("checked");
                        if (checked) {
                            $("#delete-course-btn").css("display", "flex");
                            return false;
                        }
                    }
                });
                if (!checked) {
                    $("#delete-course-btn").css("display", "none");
                }
                event.preventDefault();
            });
        }
    });
}

function checkAllCourses() {
    $("#courses").find("tbody").find("*").each(function () {
        if ($(this).prop("tagName") === "INPUT") {
            var checkBox = $(this);
            checkBox.prop("checked", true);
            checkBox.parent().find("div:eq(1)").css("opacity", "1");
        }
    });
}

function uncheckAllCourses() {
    $("#courses").find("tbody").find("*").each(function () {
        if ($(this).prop("tagName") === "INPUT") {
            var checkBox = $(this);
            checkBox.prop("checked", false);
            checkBox.parent().find("div:eq(1)").css("opacity", "0");
        }
    });
}

function getCourses() {
    $("#courses").find("tbody").empty();
    $.ajax({
        type: 'GET',
        dataType: 'text',
        url: PHP_URL+'get-courses.php',
        success: function (response) {
            console.log(response);
            var courses = JSON.parse(response);
            lecturers = courses;
            var items = "";
            for (var i = 0; i < courses.length; i++) {
                var course = courses[i];
                var id = course.id;
                var name = course.name;
                var lecturer = course.lecturer;
                items += ("<tr>" +
                    "<td>" +
                    "<div style=\"width: 100%; height: 100%; display: flex; align-items: center; align-content: center;\">" +
                    "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
                    "<input type=\"checkbox\" onclick=\"return false;\" style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
                    "<div class=\"check\">&nbsp;</div><div class=\"check-img\">" +
                    "<img src=\"img/check.png\" width=\"12px\" height=\"12px\" style=\"position: relative; left:2px; top:-6px;\">" +
                    "</div>" +
                    "</label>" +
                    "</div>" +
                    "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + lecturer + "</td>" +
                    "<td><a class='delete-course link' style='cursor: pointer;'>Hapus</a></td>" +
                    "" + "</tr>");
            }
            $("#courses").find("tbody").append(items);
            setDeleteCourseListener();
            setCheckBoxListener();
            setItemCheckBoxListener();
        },
        error: function (a, b, c) {
            alert('Error loading courses: ' + b + ' ' + c);
        }
    });
}

function addNewCourseToList(name, lecturer) {
    var item = ("<tr>" +
        "<td>" +
        "<div style=\"width: 100%; height: 100%; display: flex; align-items: center; align-content: center;\">" +
        "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
        "<input type=\"checkbox\" onclick=\"return false;\" style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
        "<div class=\"check\">&nbsp;</div><div class=\"check-img\">" +
        "<img src=\"img/check.png\" width=\"12px\" height=\"12px\" style=\"position: relative; left:2px; top:-6px;\">" +
        "</div>" +
        "</label>" +
        "</div>" +
        "</td>" +
        "<td>" + name + "</td>" +
        "<td>" + lecturer + "</td>" +
        "<td><a class='delete-course link' style='cursor: pointer;'>Hapus</a></td>" +
        "" + "</tr>");
    $('#courses').find("tbody").append(item);
}

function selectAll() {
    $('.check-all').click();
}

function addNewCourse() {
    $("#error-msg").css('display', 'none');
    $('#add-course-dialog').css('height', '240px');
    var courseName = $('#course-name').val();
    var lecturerName = $('#lecturer').val();
    if (courseName == '') {
        $("#error-msg").html("Mohon isi nama mata kuliah");
        $("#error-msg").css("display", "block");
        $("#add-course-dialog").css("height", "270px");
        return;
    }
    if (lecturerName == '') {
        $("#error-msg").html("Mohon isi nama pembimbing");
        $("#error-msg").css("display", "block");
        $("#add-course-dialog").css("height", "270px");
        return;
    }
    var regex = new RegExp("^[a-zA-Z]+$");
    if (!regex.test(courseName)) {
        $("#error-msg").html("Nama mata kuliah tidak valid");
        $("#error-msg").css("display", "block");
        $("#add-course-dialog").css("height", "270px");
        return;
    } else {
        $("#error-msg").css("display", "none");
        $("#add-course-dialog").css("height", "240px");
    }
    regex = new RegExp("^[a-zA-Z.,]+$");
    if (!regex.test(lecturerName)) {
        $("#error-msg").html("Nama pembimbing tidak valid");
        $("#error-msg").css("display", "block");
        $("#add-course-dialog").css("height", "270px");
        return;
    } else {
        $("#error-msg").css("display", "none");
        $("#add-course-dialog").css("height", "240px");
    }
    if (courseName.length > 50) {
        courseName = courseName.substr(0, 50);
    }
    if (lecturerName.length > 60) {
        lecturerName = lecturerName.substr(0, 60);
    }
    // Check if course name already exists
    $.ajax({
        type: 'GET',
        dataType: 'text',
        url: PHP_URL+'check-course-availability.php',
        data: {'name': courseName},
        cache: false,
        success: function (r) {
            if (r == 0) {
                // Course not available
                $.ajax({
                    type: 'GET',
                    dataType: 'text',
                    url: PHP_URL+'add-course.php',
                    data: {'name': courseName, 'lecturer': lecturerName},
                    cache: false,
                    success: function (r) {
                        if (r < 0) {
                            $("#error-msg").html("Maaf, nama mata kuliah sudah ada");
                            $("#error-msg").css("display", "block");
                            $("#add-course-dialog").css("height", "270px");
                            return;
                        }
                        addNewCourseToList(courseName, lecturerName);
                        $("#course-name").val("");
                        $("#lecturer").val("");
                        $('#dialog').css('display', 'none');
                        setDeleteCourseListener();
                    },
                    error: function (a, b, c) {
                        alert(b + ' ' + c);
                    }
                });
            } else if (r == -1) {
                // Course available
                $('#error-msg').html("Maaf, kategori sudah ada");
                $('#add-course-dialog').css('height', '270px');
                $("#error-msg").css('display', 'block');
            }
        },
        error: function (a, b, c) {
            alert('Error: ' + b + ' ' + c);
        }
    });
}

function addCourse() {
    $("#error-msg").css('display', 'none');
    $('#dialog').css('display', 'block');
}

function cancelAddingCourse() {
    $('#course-name').val("");
    $('#dialog').css('display', 'none');
    $('#add-course-dialog').css('height', '240px');
}

function setDeleteCourseListener() {
    $(".delete-course").on("click", function () {
        var deleteCourseLink = $(this);
        var courseName = deleteCourseLink.closest("tr").find("td:eq(1)").html();
        $("#prompt-title").html("Hapus Mata Kuliah");
        $("#prompt-text").html("Apakah Anda yakin ingin menghapus mata kuliah ini?");
        $("#prompt-no").html("BATAL");
        $("#prompt-yes").html("HAPUS");
        $("#prompt").css("display", "block");
        $("#prompt-no").on("click", function () {
            $("#prompt").css("display", "none");
        });
        $("#prompt-yes").on("click", function () {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: PHP_URL+'delete-course.php',
                data: {'name': courseName},
                cache: false,
                success: function (a) {
                    deleteCourseLink.closest("tr").remove();
                    $("#prompt").css("display", "none");
                },
                error: function (a, b, c) {
                    alert(b + ' ' + c);
                }
            });
        });
    });
}

function backupCourses() {
    $.ajax({
        type: 'GET',
        dataType: 'text',
        url: PHP_URL+'save-courses.php',
        data: {'filename': 'courses.json'},
        cache: false,
        success: function(a) {
            /*var win = window.open("download-file.php?filename=courses.json&download_file_name=matakuliah.json", "_blank");
            win.focus();*/
            $("#save-courses")[0].click();
        },
        error: function(a, b, c) {
            error(b+' '+c);
        }
    });
}

function clearCourses() {
    $("#courses").find("tbody").find("*").remove();
}

function uploadCourses() {
    $("#open-upload-dialog").on("change", function() {
        var fr = new FileReader();
        fr.onload = function() {
            var jsonData = fr.result;
            $.ajax({
                url: PHP_URL+'restore-courses.php',
                type: 'POST',
                dataType: 'text',
                data: {'data': jsonData},
                success: function(a) {
                    clearCourses();
                    var json = JSON.parse(jsonData);
                    for (var i=0; i<json.length; i++) {
                        addNewCourseToList(json[i].name, json[i].lecturer);
                    }
                    setDeleteCourseListener();
                },
                error: function(a, b, c) {

                }
            });
        };
        fr.readAsText($("#open-upload-dialog").prop("files")[0], "utf-8");
        /*var formData = new FormData();
        /*var fr = new FileReader();
        fr.readAsDataURL($("#open-upload-dialog").prop("files")[0]);
        var formData = new FormData();
        formData.append("file", $("#open-upload-dialog").prop("files")[0]);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'restore-courses.php',
            data: {'mydata': 'myFile'},
            success: function(a) {
                alert(a);
            },
            error: function(a, b, c) {

            }
        });*/
    });
    $("#open-upload-dialog").click();
}