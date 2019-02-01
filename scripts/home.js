const PHP_URL = "http://ilatih.com/backend/scripts/";
var lecturers = {};
var courseIndex = -1;
var courseName = "";
var babImgURL = "";
var babIndex = -1;
var babName = "";
var correctAnswer = -1;
var editQuestionMediaData = "";
var pictureFile = "";
var mediaType = "";
var adminsJSON;
var usersJSON;
var imageData = "";
var videoData = "";
var audioData = "";
var imageSize = 0;
var videoSize = 0;
var audioSize = 0;
var questionType = -1;
var currentQuestion = 0;
var fillQuestionImageFile;
var coursesJSON;
var edittedCourseID;
var currentEdittedQuestion;
var audioFile;
var videoFile;

$(document).ready(function () {
    setCheckBoxListener();
    $("#home-panel-selector").on("click", function () {
        $("#home-panel").css("display", "block");
        $("#home-panel-selector").addClass("active");
        $("#questions-panel").css("display", "none");
        $("#questions-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "none");
        $("#bab-panel-selector").removeClass("active");
        $("#course-panel").css("display", "none");
        $("#course-panel-selector").removeClass("active");
        $("#admins-panel").css("display", "none");
        $("#admins-panel-selector").removeClass("active");
        $("#users-panel").css("display", "none");
        $("#users-panel-selector").removeClass("active");
        $("#settings-panel").css("display", "none");
        $("#settings-panel-selector").removeClass("active");
    });
    $("#course-panel-selector").on("click", function () {
        $("#home-panel").css("display", "none");
        $("#home-panel-selector").removeClass("active");
        $("#questions-panel").css("display", "none");
        $("#questions-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "none");
        $("#bab-panel-selector").removeClass("active");
        $("#course-panel").css("display", "block");
        $("#course-panel-selector").addClass("active");
        $("#admins-panel").css("display", "none");
        $("#admins-panel-selector").removeClass("active");
        $("#users-panel").css("display", "none");
        $("#users-panel-selector").removeClass("active");
        $("#settings-panel").css("display", "none");
        $("#settings-panel-selector").removeClass("active");
        getCourses();
    });
    $("#questions-panel-selector").on("click", function () {
        $("#home-panel").css("display", "none");
        $("#home-panel-selector").removeClass("active");
        $("#course-panel").css("display", "none");
        $("#course-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "none");
        $("#bab-panel-selector").removeClass("active");
        $("#questions-panel").css("display", "block");
        $("#questions-panel-selector").addClass("active");
        $("#admins-panel").css("display", "none");
        $("#admins-panel-selector").removeClass("active");
        $("#users-panel").css("display", "none");
        $("#users-panel-selector").removeClass("active");
        $("#settings-panel").css("display", "none");
        $("#settings-panel-selector").removeClass("active");
        getQuestions();
    });
    $("#bab-panel-selector").on("click", function () {
        $("#home-panel").css("display", "none");
        $("#home-panel-selector").removeClass("active");
        $("#course-panel").css("display", "none");
        $("#course-panel-selector").removeClass("active");
        $("#questions-panel").css("display", "none");
        $("#questions-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "block");
        $("#bab-panel-selector").addClass("active");
        $("#admins-panel").css("display", "none");
        $("#admins-panel-selector").removeClass("active");
        $("#users-panel").css("display", "none");
        $("#users-panel-selector").removeClass("active");
        $("#settings-panel").css("display", "none");
        $("#settings-panel-selector").removeClass("active");
        getDaftarBab();
    });
    $("#admins-panel-selector").on("click", function () {
        $("#home-panel").css("display", "none");
        $("#home-panel-selector").removeClass("active");
        $("#course-panel").css("display", "none");
        $("#course-panel-selector").removeClass("active");
        $("#questions-panel").css("display", "none");
        $("#questions-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "none");
        $("#bab-panel-selector").removeClass("active");
        $("#admins-panel").css("display", "block");
        $("#admins-panel-selector").addClass("active");
        $("#users-panel").css("display", "none");
        $("#users-panel-selector").removeClass("active");
        $("#settings-panel").css("display", "none");
        $("#settings-panel-selector").removeClass("active");
        getAdmins();
    });
    $("#users-panel-selector").on("click", function () {
        $("#home-panel").css("display", "none");
        $("#home-panel-selector").removeClass("active");
        $("#course-panel").css("display", "none");
        $("#course-panel-selector").removeClass("active");
        $("#questions-panel").css("display", "none");
        $("#questions-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "none");
        $("#bab-panel-selector").removeClass("active");
        $("#admins-panel").css("display", "none");
        $("#admins-panel-selector").removeClass("active");
        $("#users-panel").css("display", "block");
        $("#users-panel-selector").addClass("active");
        $("#settings-panel").css("display", "none");
        $("#settings-panel-selector").removeClass("active");
        getUsers();
    });
    $("#settings-panel-selector").on("click", function () {
        $("#home-panel").css("display", "none");
        $("#home-panel-selector").removeClass("active");
        $("#course-panel").css("display", "none");
        $("#course-panel-selector").removeClass("active");
        $("#questions-panel").css("display", "none");
        $("#questions-panel-selector").removeClass("active");
        $("#bab-panel").css("display", "none");
        $("#bab-panel-selector").removeClass("active");
        $("#admins-panel").css("display", "none");
        $("#admins-panel-selector").removeClass("active");
        $("#users-panel").css("display", "none");
        $("#users-panel-selector").removeClass("active");
        $("#settings-panel").css("display", "block");
        $("#settings-panel-selector").addClass("active");
        loadSettings();
    });
    $("#show-courses").on("click", function () {
        if ($("#courses-2").css("display") == "none") {
            $("#courses-2").css("display", "flex");
        } else {
            $("#courses-2").css("display", "none");
        }
    });
    $("#add-question-show-courses").on("click", function () {
        if ($("#add-question-courses").css("display") == "none") {
            $("#add-question-courses").css("display", "flex");
        } else {
            $("#add-question-courses").css("display", "none");
        }
    });
    $("#add-question-show-babs").on("click", function () {
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
    $("#add-bab").on("click", function () {
        $("#bab-name").val("");
        $("#add-bab-dialog").css("height", "360px");
        $("#add-bab-error").css("display", "none");
        $("#choose-course").html("Pilih Mata Kuliah");
        $("#add-bab-access-code").val("");
        $("#add-bab-dialog-ctr").css("display", "flex");
        $("#add-bab-dialog-ctr").hide();
        $("#add-bab-dialog-ctr").fadeIn(200);
    });
    $("#add-bab-img-ctr").on({
        mouseenter: function () {
            $("#add-bab-img-overlay").css("background-color", "rgba(0, 0, 0, 0.5)");
            $("#add-bab-img-btn").css("opacity", "1");
        },
        mouseleave: function () {
            $("#add-bab-img-overlay").css("background-color", "rgba(0, 0, 0, 0)");
            $("#add-bab-img-btn").css("opacity", "0");
        }
    });
    $("#select-bab-img").on("change", function () {
        var fr = new FileReader();
        fr.onload = function (e) {
            var imgData = fr.result;
            var formData = new FormData();
            formData.append('img_data', imgData);
            $.ajax({
                type: 'POST',
                url: PHP_URL + 'upload-img.php',
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function (a) {
                    var imgFileName = a;
                    babImgURL = "http://ilatih.com/backend/userdata/imgs/" + imgFileName;
                    document.getElementById("bab-img").src = babImgURL;
                },
                error: function (a, b, c) {
                    alert(b + ' ' + c);
                }
            });
        };
        fr.readAsDataURL($(this).prop("files")[0]);
    });
    $("#add-question").on("click", function () {
        imageData = "";
        audioData = "";
        videoData = "";
        $("#add-question-dialog-ctr").css("display", "flex");
        $("#add-question-dialog-ctr").hide();
        $("#add-question-dialog-ctr").fadeIn(200);
    });
    $("#a-check").on({
        mouseenter: function () {
            $("#a-check-active").css("display", "block");
        },
        mouseleave: function () {
            $("#a-check-active").css("display", "none");
        }
    });
    $("#a-check").on("click", function () {
        $("#a-check").unbind("mouseenter mouseleave");
        $("#a-check-active").css("display", "block");
        $("#b-check-active").css("display", "none");
        $("#c-check-active").css("display", "none");
        $("#d-check-active").css("display", "none");
        correctAnswer = 0;
    });
    $("#b-check").on({
        mouseenter: function () {
            $("#b-check-active").css("display", "block");
        },
        mouseleave: function () {
            $("#b-check-active").css("display", "none");
        }
    });
    $("#b-check").on("click", function () {
        $("#b-check").unbind("mouseenter mouseleave");
        $("#a-check-active").css("display", "none");
        $("#b-check-active").css("display", "block");
        $("#c-check-active").css("display", "none");
        $("#d-check-active").css("display", "none");
        correctAnswer = 1;
    });
    $("#c-check").on({
        mouseenter: function () {
            $("#c-check-active").css("display", "block");
        },
        mouseleave: function () {
            $("#c-check-active").css("display", "none");
        }
    });
    $("#c-check").on("click", function () {
        $("#c-check").unbind("mouseenter mouseleave");
        $("#a-check-active").css("display", "none");
        $("#b-check-active").css("display", "none");
        $("#c-check-active").css("display", "block");
        $("#d-check-active").css("display", "none");
        correctAnswer = 2;
    });
    $("#d-check").on({
        mouseenter: function () {
            $("#d-check-active").css("display", "block");
        },
        mouseleave: function () {
            $("#d-check-active").css("display", "none");
        }
    });
    $("#d-check").on("click", function () {
        $("#d-check").unbind("mouseenter mouseleave");
        $("#a-check-active").css("display", "none");
        $("#b-check-active").css("display", "none");
        $("#c-check-active").css("display", "none");
        $("#d-check-active").css("display", "block");
        $("#e-check-active").css("display", "none");
        correctAnswer = 3;
    });
    $(".profile-picture").on("click", function () {
        var accountPanel = $(this).parent().parent().find(".account-panel");
        if (accountPanel.css("display") == "none") {
            accountPanel.css("display", "block");
        } else {
            accountPanel.css("display", "none");
        }
    });
    $(".log-out").on("click", function () {
        $.ajax({
            type: 'GET',
            url: PHP_URL + 'logout.php',
            dataType: 'text',
            cache: false,
            success: function (a) {
                window.location.href = "index.html";
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    });
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'get-session.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            var cred = JSON.parse(a);
            $(".account-email").html(cred.email);
        }
    });
});

function loadSettings() {
    $("#settings-saved").css("display", "none");
    $("#db-form").css("margin-top", "20px");
    $.ajax({
        type: 'GET',
        url: "http://ilatih.com/backend/systemdata/settings.xml",
        dataType: 'text',
        cache: false,
        success: function (a) {
            var parser = new DOMParser();
            var settings = parser.parseFromString(a, "text/xml");
            var rulesTag = settings.getElementsByTagName("rules")[0];
            var rules = "";
            if (rulesTag.childNodes[0] != null) {
                rules = rulesTag.childNodes[0].nodeValue;
            }
            rules = rules.replace(/@/g, "\n");
            $("#rules").val(rules);
            var mysql = settings.getElementsByTagName("mysql")[0];
            var host = "";
            if (mysql.getElementsByTagName("host")[0].childNodes[0] != null) {
                host = mysql.getElementsByTagName("host")[0].childNodes[0].nodeValue;
            }
            var dbuser = "";
            if (mysql.getElementsByTagName("dbuser")[0].childNodes[0] != null) {
                dbuser = mysql.getElementsByTagName("dbuser")[0].childNodes[0].nodeValue;
            }
            if (mysql.getElementsByTagName("dbpass")[0].childNodes[0] != null) {
                var dbpass = mysql.getElementsByTagName("dbpass")[0].childNodes[0].nodeValue;
                $("#db-password").val(dbpass);
            }
            var dbname = "";
            if (mysql.getElementsByTagName("dbname")[0].childNodes[0] != null) {
                dbname = mysql.getElementsByTagName("dbname")[0].childNodes[0].nodeValue;
            }
            $("#website").val(host);
            $("#db-user").val(dbuser);
            $("#db-name").val(dbname);
            var admin = settings.getElementsByTagName("admin")[0];
            var address = "";
            if (admin.getElementsByTagName("address")[0].childNodes[0] != null) {
                address = admin.getElementsByTagName("address")[0].childNodes[0].nodeValue;
            }
            var phone = "";
            if (admin.getElementsByTagName("phone")[0].childNodes[0] != null) {
                phone = admin.getElementsByTagName("phone")[0].childNodes[0].nodeValue;
            }
            $("#admin-address").val(address);
            $("#admin-phone").val(phone);
            var adminEmail = "";
            if (admin.getElementsByTagName("email")[0].childNodes[0] != null) {
                adminEmail = admin.getElementsByTagName("email")[0].childNodes[0].nodeValue;
            }
            $("#admin-email").val(adminEmail);
            var links = settings.getElementsByTagName("links")[0];
            var twitterURL = "";
            if (links.getElementsByTagName("twitter")[0].childNodes[0] != null) {
                twitterURL = links.getElementsByTagName("twitter")[0].childNodes[0].nodeValue;
            }
            var facebookURL = "";
            if (links.getElementsByTagName("facebook")[0].childNodes[0] != null) {
                facebookURL = links.getElementsByTagName("facebook")[0].childNodes[0].nodeValue;
            }
            var instagramURL = "";
            if (links.getElementsByTagName("instagram")[0].childNodes[0] != null) {
                instagramURL = links.getElementsByTagName("instagram")[0].childNodes[0].nodeValue;
            }
            var googlePlusURL = "";
            if (links.getElementsByTagName("googlePlus")[0].childNodes[0] != null) {
                googlePlusURL = links.getElementsByTagName("googlePlus")[0].childNodes[0].nodeValue;
            }
            var linkedInURL = "";
            if (links.getElementsByTagName("linkedIn")[0].childNodes[0] != null) {
                linkedInURL = links.getElementsByTagName("linkedIn")[0].childNodes[0].nodeValue;
            }
            $("#twitter-url").val(twitterURL);
            $("#facebook-url").val(facebookURL);
            $("#instagram-url").val(instagramURL);
            $("#google-plus-url").val(googlePlusURL);
            $("#linked-in-url").val(linkedInURL);
            $("#save-settings").on("click", function () {
                mysql.getElementsByTagName("host")[0].childNodes[0].nodeValue = $("#website").val();
                mysql.getElementsByTagName("dbuser")[0].childNodes[0].nodeValue = $("#db-user").val();
                if (mysql.getElementsByTagName("dbpass")[0].childNodes[0] == null) {
                    var pass = settings.createElement("pass");
                    pass.nodeValue = $("#db-password").val();
                    mysql.getElementsByTagName("dbpass")[0].appendChild(pass);
                } else {
                    mysql.getElementsByTagName("dbpass")[0].childNodes[0].nodeValue = $("#db-password").val();
                }
                mysql.getElementsByTagName("dbname")[0].childNodes[0].nodeValue = $("#db-name").val();
                twitterURL = $("#twitter-url").val();
                facebookURL = $("#facebook-url").val();
                instagramURL = $("#instagram-url").val();
                googlePlusURL = $("#google-plus-url").val();
                linkedInURL = $("#linked-in-url").val();
                address = $("#admin-address").val();
                phone = $("#admin-phone").val();
                var xmlData = new XMLSerializer().serializeToString(settings);
                var fd = new FormData();
                fd.append("data", xmlData);
                fd.append("website", $("#website").val());
                fd.append("db-user", $("#db-user").val());
                fd.append("db-pass", $("#db-password").val());
                fd.append("db-name", $("#db-name").val());
                fd.append("email", $("#admin-email").val());
                fd.append("address", address);
                fd.append("phone", phone);
                fd.append("twitter-url", twitterURL);
                fd.append("facebook-url", facebookURL);
                fd.append("instagram-url", instagramURL);
                fd.append("google-plus-url", googlePlusURL);
                fd.append("linked-in-url", linkedInURL);
                var rules = $("#rules").val();
                rules = rules.replace(/\n/g, "@");
                fd.append("rules", rules);
                $.ajax({
                    type: 'POST',
                    url: PHP_URL + 'save-settings.php',
                    data: fd,
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (a) {
                        $("#db-form").css("margin-top", "10px");
                        $("#settings-saved").css("display", "block");
                        window.scrollTo(0, 0);
                    },
                    error: function (a, b, c) {
                        alert(b + ' ' + c);
                    }
                });
            });
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function getAdmins() {
    $("#admins").find("tbody").find("*").remove();
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'get-admins.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var admins = JSON.parse(a);
                adminsJSON = admins;
                var items = "";
                for (var i = 0; i < admins.length; i++) {
                    var admin = admins[i];
                    var id = admin.id;
                    var email = admin.email;
                    var password = admin.password;
                    var hiddenPassword = "";
                    for (var j = 0; j < password.length; j++) {
                        hiddenPassword += "*";
                    }
                    items += ("<tr>" +
                        "<td>" +
                        "<div style=\"width: 100%; height: 100%; display: flex; align-items: center; align-content: center;\">" +
                        "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
                        "<input type=\"checkbox\" onclick=\"return false;\" style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
                        "<div class=\"admins-check\">&nbsp;</div><div class=\"admins-check-img\">" +
                        "<img src=\"img/check.png\" width=\"12px\" height=\"12px\" style=\"position: relative; left:2px; top:-6px;\">" +
                        "</div>" +
                        "</label>" +
                        "</div>" +
                        "</td>" +
                        "<td>" + email + "</td>" +
                        "<td>" + hiddenPassword + "</td>" +
                        "<td><a id='admin-" + i + "' class='edit-admin link' style='cursor: pointer;'>Edit</a></td>" +
                        "" + "</tr>");
                }
                $("#admins").find("tbody").append(items);
                setDeleteAllAdminsListener();
                setDeleteAdminListener();
                setAdminsCheckBoxListener();
                setAdminCheckBoxListener();
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function getUsers() {
    $("#users").find("tbody").find("*").remove();
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'get-users.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var users = JSON.parse(a);
                usersJSON = users;
                var items = "";
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    var name = user.name;
                    var email = user.email;
                    var password = user.password;
                    var phone = user.phone;
                    var hiddenPassword = "";
                    for (var j = 0; j < password.length; j++) {
                        hiddenPassword += "*";
                    }
                    items += ("<tr>" +
                        "<td>" +
                        "<div style=\"width: 100%; height: 100%; display: flex; align-items: center; align-content: center;\">" +
                        "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
                        "<input type=\"checkbox\" onclick=\"return false;\" style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
                        "<div class=\"users-check\">&nbsp;</div><div class=\"users-check-img\">" +
                        "<img src=\"img/check.png\" width=\"12px\" height=\"12px\" style=\"position: relative; left:2px; top:-6px;\">" +
                        "</div>" +
                        "</label>" +
                        "</div>" +
                        "</td>" +
                        "<td>" + name + "</td>" +
                        "<td>" + email + "</td>" +
                        "<td>" + hiddenPassword + "</td>" +
                        "<td>" + phone + "</td>" +
                        "<td><a id='user-" + i + "' class='view-score link' style='cursor: pointer;'>Lihat Skor</a></td>" +
                        "<td><a id='user-scores-" + i + "' class='edit-user link' style='cursor: pointer;'>Edit</a></td>" +
                        "" + "</tr>");
                }
                $("#users").find("tbody").append(items);
                setDeleteAllUsersListener();
                setEditUserListener();
                setUsersCheckBoxListener();
                setUserCheckBoxListener();
                setViewScoresLinkListener();
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function setViewScoresLinkListener() {
    $(".view-score").on("click", function() {
        $("#scores").find("tbody").find("*").remove();
        var tr = $(this).parent().parent();
        var tbody = tr.parent();
        var index = tbody.children().index(tr);
        var user = usersJSON[index];
        var userId = user["id"];
        $.ajax({
            type: 'GET',
            url: 'http://ilatih.com/backend/scripts/get-scores.php',
            data: {'user-id': userId},
            dataType: 'text',
            cache: false,
            success: function(a) {
                if (a < 0) {
                    // Error
                } else {
                    var scores = JSON.parse(a);
                    var items = "";
                    for (var i=0; i<scores.length; i++) {
                        var score = scores[i];
                        items += ("<tr>" +
                            "<td>" +
                            "<div style=\"width: 100%; height: 100%; display: flex; align-items: center; align-content: center;\">" +
                            "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
                            "<input type=\"checkbox\" onclick=\"return false;\" style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
                            "<div class=\"users-check\">&nbsp;</div><div class=\"users-check-img\">" +
                            "<img src=\"img/check.png\" width=\"12px\" height=\"12px\" style=\"position: relative; left:2px; top:-6px;\">" +
                            "</div>" +
                            "</label>" +
                            "</div>" +
                            "</td>" +
                            "<td>" + score["mata_kuliah"] + "</td>" +
                            "<td>" + score["bab"] + "</td>" +
                            "<td>" + score["score"] + "</td>"+
                            "" + "</tr>");
                    }
                    $("#scores").find("tbody").append(items);
                }
            }
        });
        $("#view-score-container").css("display", "flex");
    });
}

function setDeleteAllUsersListener() {
    $("#delete-user-btn").on("click", function () {
        deleteUsers();
    });
}

function deleteUsers() {
    var checkBox = $(".users-check-all").parent().find("input");
    var checked = checkBox.prop("checked");
    $("#prompt-yes").html("YA");
    $("#prompt-no").html("TIDAK");
    $("#prompt-no").css("display", "block");
    $("#prompt-text").html("Apakah Anda yakin ingin menghapus user ini?");
    $("#prompt-title").html("Hapus User");
    $("#prompt").css("display", "flex");
    $("#prompt-yes").on("click", function () {
        // Get all checked items
        var index = 0;
        var totalChecked = 0;
        $("#users").find("tbody").find("*").each(function () {
            if ($(this).prop("tagName") == "INPUT") {
                var inputIndex = index;
                var checked = $(this).prop("checked");
                if (checked) {
                    $.ajax({
                        type: 'GET',
                        dataType: 'text',
                        url: PHP_URL + 'delete-user.php',
                        data: {'id': usersJSON[index].id},
                        cache: false,
                        success: function (a) {
                            $("#prompt").css("display", "none");
                            $("#delete-user-btn").css("display", "none");
                            getUsers();
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
}

function setEditUserListener() {
    $(".edit-user").on("click", function () {
        var userId = $(this).attr("id");
        var a = userId.indexOf("user-") + 5;
        var b = userId.length - a;
        var index = parseInt(userId.substr(a, b));
        editUser(index);
    });
}

function setUsersCheckBoxListener() {
    $('.users-check-all').on('click', function () {
        var checkBox = $(this).parent().find("input");
        var checked = checkBox.prop("checked");
        if (checked) {
            checked = false;
        } else {
            checked = true;
        }
        checkBox.prop("checked", checked);
        $("#delete-user-btn").css("display", "none");
        if (checked) {
            $(this).css("opacity", "1");
            checkAllUsers();
        } else {
            $(this).css("opacity", "0");
            uncheckAllUsers();
        }
        event.stopPropagation();
    });
}

function checkAllUsers() {
    $("#users").find("tbody").find("*").each(function () {
        if ($(this).prop("tagName") == "INPUT") {
            var checkBox = $(this);
            checkBox.prop("checked", true);
            checkBox.parent().find("div:eq(1)").css("opacity", "1");
        }
    });
}

function uncheckAllUsers() {
    $("#users").find("tbody").find("*").each(function () {
        if ($(this).prop("tagName") == "INPUT") {
            var checkBox = $(this);
            checkBox.prop("checked", false);
            checkBox.parent().find("div:eq(1)").css("opacity", "0");
        }
    });
}

function setUserCheckBoxListener() {
    $("#users").find("tbody").find("*").each(function () {
        if ($(this).attr("class") == "users-check-img") {
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
                $("#users").find("tbody").find("*").each(function () {
                    if ($(this).prop("tagName") == "INPUT") {
                        checked = $(this).prop("checked");
                        if (checked) {
                            $("#delete-user-btn").css("display", "flex");
                            return false;
                        }
                    }
                });
                if (!checked) {
                    $("#delete-user-btn").css("display", "none");
                }
                event.preventDefault();
            });
        }
    });
}

function editUser(index) {
    $("#user-name").val(usersJSON[index].name);
    $("#user-phone").val(usersJSON[index].phone);
    $("#user-password").val(usersJSON[index].password);
    $("#edit-user-dialog").css("height", "325px");
    $("#edit-user-error").html("");
    $("#edit-user-error").css("display", "none");
    $("#edit-user-dialog-ctr").css("display", "flex");
    $("#edit-user-dialog-ctr").hide();
    $("#edit-user-dialog-ctr").fadeIn(200);
    $("#save-user").on("click", function () {
        $("#edit-user-error").html("");
        $("#edit-user-error").css("display", "none");
        $("#edit-user-dialog").css("height", "325px");
        var name = $("#user-name").val();
        var password = $("#user-password").val();
        var phone = $("#user-phone").val();
        if (name == '') {
            $("#edit-user-dialog").css("height", "315px");
            $("#edit-user-error").html("Mohon masukkan nama user");
            $("#edit-user-error").css("display", "block");
            return;
        }
        if (password == '') {
            $("#edit-user-dialog").css("height", "315px");
            $("#edit-user-error").html("Mohon masukkan kata sandi");
            $("#edit-user-error").css("display", "block");
            return;
        }
        var userId = usersJSON[index].id;
        $.ajax({
            type: 'GET',
            url: PHP_URL + 'update-user.php',
            dataType: 'text',
            data: {'id': userId, 'name': name, 'phone': phone, 'password': password},
            cache: false,
            success: function (a) {
                $("#edit-user-dialog-ctr").css("display", "none");
                $("#edit-user-error").html("");
                $("#edit-user-error").css("display", "none");
                $("#edit-user-dialog").css("height", "235px");
                getUsers();
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    });
    $("#delete-user").on("click", function () {
        $("#prompt-title").html("Hapus User");
        $("#prompt-text").html("Apakah Anda yakin ingin menghapus user ini?");
        $("#prompt-no").html("BATAL");
        $("#prompt-no").css("display", "block");
        $("#prompt-yes").html("HAPUS");
        //$("#prompt").css("display", "block");
        $("#prompt").fadeIn(200);
        $("#prompt-no").on("click", function () {
            $("#prompt").css("display", "none");
        });
        var userId = usersJSON[index].id;
        $("#prompt-yes").on("click", function () {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: PHP_URL + 'delete-user.php',
                data: {'id': userId},
                cache: false,
                success: function (a) {
                    $("#edit-user-dialog-ctr").css("display", "none");
                    $("#prompt").css("display", "none");
                    $("#delete-user-btn").css("display", "none");
                    getUsers();
                },
                error: function (a, b, c) {
                    alert(b + ' ' + c);
                }
            });
        });
    });
}

function addUser() {
    $("#add-user-name").val("");
    $("#add-user-email").val("");
    $("#add-user-password").val("");
    $("#add-user-phone").val("");
    $("#add-user-error").html("");
    $("#add-user-error").css("display", "none");
    $("#add-user-dialog").css("height", "355px");
    $("#add-user-dialog-ctr").css("display", "flex");
    $("#add-user-dialog-ctr").hide();
    $("#add-user-dialog-ctr").fadeIn(200);
    $("#add-user").on("click", function () {
        $("#add-user-error").html("");
        $("#add-user-error").css("display", "none");
        $("#add-user-dialog").css("height", "355px");
        var name = $("#add-user-name").val();
        var email = $("#add-user-email").val();
        var password = $("#add-user-password").val();
        var phone = $("#add-user-phone").val();
        if (name == '') {
            $("#add-user-dialog").css("height", "385px");
            $("#add-user-error").html("Mohon masukkan nama");
            $("#add-user-error").css("display", "block");
            return;
        }
        if (email == '') {
            $("#add-user-dialog").css("height", "385px");
            $("#add-user-error").html("Mohon masukkan email");
            $("#add-user-error").css("display", "block");
            return;
        }
        if (password == '') {
            $("#add-user-dialog").css("height", "385px");
            $("#add-user-error").html("Mohon masukkan kata sandi");
            $("#add-user-error").css("display", "block");
            return;
        }
        $.ajax({
            type: 'GET',
            url: PHP_URL + 'add-user.php',
            dataType: 'text',
            data: {'name': name, 'email': email, 'password': password, 'phone': phone},
            cache: false,
            success: function (a) {
                if (a == 0) {
                    // Success
                    $("#add-user-dialog-ctr").css("display", "none");
                    getUsers();
                } else if (a == -1) {
                    $("#add-user-dialog").css("height", "385px");
                    $("#add-user-error").html("User dengan email yang sama sudah ada");
                    $("#add-user-error").css("display", "block");
                }
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    });
}

function cancelAddingUser() {
    $("#add-user-dialog-ctr").css("display", "none");
}

function addAdmin() {
    $("#add-admin-email").val("");
    $("#add-admin-password").val("");
    $("#add-admin-dialog-ctr").css("display", "flex");
    $("#add-admin-dialog-ctr").hide();
    $("#add-admin-dialog-ctr").fadeIn(200);
    $("#add-admin-error").html("");
    $("#add-admin-error").css("display", "none");
    $("#add-admin-dialog").css("height", "225px");
    $("#add-admin").on("click", function () {
        $("#add-admin").off("click");
        $("#add-admin-error").html("");
        $("#add-admin-error").css("display", "none");
        $("#add-admin-dialog").css("height", "225px");
        var email = $("#add-admin-email").val();
        var password = $("#add-admin-password").val();
        if (email == '') {
            $("#add-admin-error").html("Mohon isi email");
            $("#add-admin-dialog").css("height", "255px");
            $("#add-admin-error").css("display", "block");
            return;
        }
        if (password == '') {
            $("#add-admin-error").html("Mohon isi kata sandi");
            $("#add-admin-dialog").css("height", "255px");
            $("#add-admin-error").css("display", "block");
            return;
        }
        $.ajax({
            type: 'GET',
            url: PHP_URL + 'add-admin.php',
            dataType: 'text',
            data: {'email': email, 'password': password},
            cache: false,
            success: function (a) {
                $("#add-admin-dialog-ctr").css("display", "none");
                $("#add-admin-error").html("");
                $("#add-admin-error").css("display", "none");
                $("#add-admin-dialog").css("height", "225px");
                getAdmins();
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    });
}

function cancelAddingAdmin() {
    $("#add-admin-dialog-ctr").css("display", "none");
}

function setDeleteAllAdminsListener() {
    $("#delete-admin-btn").on("click", function () {
        deleteAdmins();
    });
}

function showConfirmPasswordDialog(index) {
    $("#current-password").val("");
    $("#confirm-password-dialog").css("height", "230px");
    $("#confirm-password-error").html("");
    $("#confirm-password-error").css("display", "none");
    $("#current-password").val("");
    $("#confirm-password-dialog-ctr").css("display", "flex");
    $("#confirm-password-dialog-ctr").hide();
    $("#confirm-password-dialog-ctr").fadeIn(200);
    $("#confirm-password-process").on("click", function () {
        confirmPassword(index);
    });
}

function confirmPassword(index) {
    $("#confirm-password-dialog").css("height", "230px");
    $("#confirm-password-error").html("");
    $("#confirm-password-error").css("display", "none");
    var password = $("#current-password").val();
    if (password == '') {
        $("#confirm-password-dialog").css("height", "260px");
        $("#confirm-password-error").html("Mohon masukkan kata sandi Anda");
        $("#confirm-password-error").css("display", "block");
        return;
    }
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'get-current-account.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var cred = JSON.parse(a);
                if (cred.password == password) {
                    // Password matches
                    $("#confirm-password-dialog-ctr").css("display", "none");
                    $("#admin-password").val("");
                    $("#edit-admin-dialog-ctr").css("display", "flex");
                    $("#edit-admin-dialog-ctr").hide();
                    $("#edit-admin-dialog-ctr").fadeIn(200);
                    $("#save-admin-password").on("click", function () {
                        $("#edit-admin-error").html("");
                        $("#edit-admin-error").css("display", "none");
                        $("#edit-admin-dialog").css("height", "235px");
                        var password = $("#admin-password").val();
                        if (password == '') {
                            $("#edit-admin-dialog").css("height", "255px");
                            $("#edit-admin-error").html("Mohon masukkan kata sandi");
                            $("#edit-admin-error").css("display", "block");
                            return;
                        }
                        var adminId = adminsJSON[index].id;
                        $.ajax({
                            type: 'GET',
                            url: PHP_URL + 'update-admin-password.php',
                            dataType: 'text',
                            data: {'id': adminId, 'password': password},
                            cache: false,
                            success: function (a) {
                                if (adminId == cred.id) {
                                    $.ajax({
                                        type: 'GET',
                                        url: PHP_URL + 'update-session.php',
                                        data: {'password': password},
                                        dataType: 'text',
                                        cache: false,
                                        success: function (a) {
                                        },
                                        error: function (a, b, c) {
                                            alert(b + ' ' + c);
                                        }
                                    });
                                }
                                $("#edit-admin-dialog-ctr").css("display", "none");
                                $("#edit-admin-error").html("");
                                $("#edit-admin-error").css("display", "none");
                                $("#edit-admin-dialog").css("height", "235px");
                                getAdmins();
                            },
                            error: function (a, b, c) {
                                alert(b + ' ' + c);
                            }
                        });
                    });
                    $("#delete-admin").on("click", function () {
                        $("#prompt-title").html("Hapus Admin");
                        $("#prompt-text").html("Apakah Anda yakin ingin menghapus admin ini?");
                        $("#prompt-no").html("BATAL");
                        $("#prompt-no").css("display", "block");
                        $("#prompt-yes").html("HAPUS");
                        //$("#prompt").css("display", "block");
                        $("#prompt").fadeIn(200);
                        $("#prompt-no").on("click", function () {
                            $("#prompt").css("display", "none");
                        });
                        var adminId = adminsJSON[index].id;
                        $("#prompt-yes").on("click", function () {
                            $.ajax({
                                type: 'GET',
                                dataType: 'text',
                                url: PHP_URL + 'delete-admin.php',
                                data: {'id': adminId},
                                cache: false,
                                success: function (a) {
                                    $("#edit-admin-dialog-ctr").css("display", "none");
                                    $("#prompt").css("display", "none");
                                    getAdmins();
                                },
                                error: function (a, b, c) {
                                    alert(b + ' ' + c);
                                }
                            });
                        });
                    });
                } else {
                    // Password does not match
                    $("#confirm-password-dialog").css("height", "260px");
                    $("#confirm-password-error").html("Kata sandi tidak cocok");
                    $("#confirm-password-error").css("display", "block");
                }
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function cancelConfirmingPassword() {
    $("#confirm-password-dialog").css("height", "230px");
    $("#confirm-password-error").html("");
    $("#confirm-password-error").css("display", "none");
    $("#confirm-password-dialog-ctr").css("display", "none");
}

function setDeleteAdminListener() {
    $(".edit-admin").on("click", function () {
        var adminId = $(this).attr("id");
        var a = adminId.indexOf("admin-") + 6;
        var b = adminId.length - a;
        var index = parseInt(adminId.substr(a, b));
        showConfirmPasswordDialog(index);
    });
}

function deleteAdmins() {
    if (adminsJSON.length == 1) {
        $("#prompt-yes").html("OK");
        $("#prompt-no").css("display", "none");
        $("#prompt-text").html("Maaf, jumlah minimum admin yang diperbolehkan adalah 1.");
        $("#prompt-title").html("Hapus Admin");
        $("#prompt").css("display", "flex");
        $("#prompt-yes").on("click", function () {
            $("#prompt").css("display", "none");
        });
    } else {
        var checkBox = $(".admins-check-all").parent().find("input");
        var checked = checkBox.prop("checked");
        $("#prompt-yes").html("YA");
        $("#prompt-no").html("TIDAK");
        $("#prompt-no").css("display", "block");
        $("#prompt-text").html("Apakah Anda yakin ingin menghapus admin ini?");
        $("#prompt-title").html("Hapus Admin");
        $("#prompt").css("display", "flex");
        $("#prompt-yes").on("click", function () {
            // Get all checked items
            var index = 0;
            var totalChecked = 0;
            $("#admins").find("tbody").find("*").each(function () {
                if ($(this).prop("tagName") == "INPUT") {
                    var inputIndex = index;
                    var checked = $(this).prop("checked");
                    if (checked) {
                        $.ajax({
                            type: 'GET',
                            dataType: 'text',
                            url: PHP_URL + 'delete-admin.php',
                            data: {'id': adminsJSON[index].id},
                            cache: false,
                            success: function (a) {
                                $("#prompt").css("display", "none");
                                getAdmins();
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
    }
}

function setAdminsCheckBoxListener() {
    $('.admins-check-all').on('click', function () {
        var checkBox = $(this).parent().find("input");
        var checked = checkBox.prop("checked");
        if (checked) {
            checked = false;
        } else {
            checked = true;
        }
        checkBox.prop("checked", checked);
        $("#delete-admin-btn").css("display", "none");
        if (checked) {
            $(this).css("opacity", "1");
            checkAllAdmins();
        } else {
            $(this).css("opacity", "0");
            uncheckAllAdmins();
        }
        event.stopPropagation();
    });
}

function checkAllAdmins() {
    $("#admins").find("tbody").find("*").each(function () {
        if ($(this).prop("tagName") == "INPUT") {
            var checkBox = $(this);
            checkBox.prop("checked", true);
            checkBox.parent().find("div:eq(1)").css("opacity", "1");
        }
    });
}

function uncheckAllAdmins() {
    $("#admins").find("tbody").find("*").each(function () {
        if ($(this).prop("tagName") == "INPUT") {
            var checkBox = $(this);
            checkBox.prop("checked", false);
            checkBox.parent().find("div:eq(1)").css("opacity", "0");
        }
    });
}

function setAdminCheckBoxListener() {
    $("#admins").find("tbody").find("*").each(function () {
        if ($(this).attr("class") == "admins-check-img") {
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
                $("#admins").find("tbody").find("*").each(function () {
                    if ($(this).prop("tagName") == "INPUT") {
                        checked = $(this).prop("checked");
                        if (checked) {
                            $("#delete-admin-btn").css("display", "flex");
                            return false;
                        }
                    }
                });
                if (!checked) {
                    $("#delete-admin-btn").css("display", "none");
                }
                event.preventDefault();
            });
        }
    });
}

function getQuestions() {
    $("#questions").find("*").remove();
    $.ajax({
        type: 'GET',
        dataType: 'text',
        cache: false,
        url: PHP_URL + 'get-questions.php',
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                a = decode_utf8(a);
                var courses = JSON.parse(a);
                coursesJSON = courses;
                for (var i = 0; i < courses.length; i++) {
                    var course = courses[i];
                    var divCourse = document.createElement("div");
                    /* Course */
                    var divCourseName = document.createElement("div");
                    divCourseName.setAttribute("class", "course-name");
                    divCourseName.innerHTML = "<div style='margin-left: 20px; margin-top: 10px; margin-bottom: 10px; font-family: \"PalanquinBold\", Arial;'>Mata kuliah:&nbsp;</div> " + course.name;
                    var divExpandCourse = document.createElement("div");
                    divExpandCourse.setAttribute("class", "expand expand-course");
                    var divExpandCourseImgCtr = document.createElement("div");
                    divExpandCourseImgCtr.setAttribute("class", "expand-img-ctr");
                    var divExpandCourseImg = document.createElement("img");
                    divExpandCourseImg.src = "http://ilatih.com/backend/img/expand.png";
                    divExpandCourseImg.setAttribute("width", "10px");
                    divExpandCourseImg.setAttribute("height", "10px");
                    divExpandCourseImgCtr.appendChild(divExpandCourseImg);
                    divExpandCourse.appendChild(divExpandCourseImgCtr);
                    divCourseName.appendChild(divExpandCourse);
                    divCourse.appendChild(divCourseName);
                    /* Bab */
                    var babs = course.bab;
                    for (var j = 0; j < babs.length; j++) {
                        var bab = babs[j];
                        var divBab = document.createElement("div");
                        divBab.setAttribute("class", "bab-name-ctr");
                        var divBabName = document.createElement("div");
                        divBabName.setAttribute("class", "bab-name");
                        divBabName.innerHTML = "<div style='margin-left: 20px; margin-top: 10px; margin-bottom: 10px; font-family: \"PalanquinBold\", Arial;'>Bab:&nbsp;</div> " + bab.name;
                        var divExpandBab = document.createElement("div");
                        divExpandBab.setAttribute("class", "expand expand-bab");
                        var divExpandBabImgCtr = document.createElement("div");
                        divExpandBabImgCtr.setAttribute("class", "expand-img-ctr");
                        var divExpandBabImg = document.createElement("img");
                        divExpandBabImg.src = "http://ilatih.com/backend/img/expand.png";
                        divExpandBabImg.setAttribute("width", "10px");
                        divExpandBabImg.setAttribute("height", "10px");
                        divExpandBabImgCtr.appendChild(divExpandBabImg);
                        divExpandBab.appendChild(divExpandBabImgCtr);
                        divBabName.appendChild(divExpandBab);
                        divBab.appendChild(divBabName);
                        divCourse.appendChild(divBab);
                        /* Questions */
                        var questions = bab.questions;
                        for (var k = 0; k < questions.length; k++) {
                            var question = questions[k];
                            var divQuestion = document.createElement("div");
                            divQuestion.setAttribute("class", "question-content-ctr");
                            var divQuestionContent = document.createElement("div");
                            divQuestionContent.setAttribute("class", "question-content");
                            divQuestionContent.innerHTML = "<div style='margin-left: 20px; margin-top: 10px; margin-bottom: 10px; font-family: \"PalanquinBold\", Arial;'>Pertanyaan:&nbsp;</div> " + question.question;
                            var divEditQuestionCtr = document.createElement("div");
                            divEditQuestionCtr.setAttribute("class", "edit-question-ctr");
                            var btnEditQuestion = document.createElement("button");
                            btnEditQuestion.setAttribute("id", "course-" + i + "-bab-" + j + "-question-" + k);
                            btnEditQuestion.setAttribute("class", "edit-question");
                            btnEditQuestion.innerHTML = "Edit";
                            divEditQuestionCtr.appendChild(btnEditQuestion);
                            divQuestionContent.appendChild(divEditQuestionCtr);
                            divQuestion.appendChild(divQuestionContent);
                            divBab.appendChild(divQuestion);
                        }
                    }
                    document.getElementById("questions").appendChild(divCourse);
                    $(".course-name").unbind().on("click", function () {
                        expandCourse($(this));
                    });
                    $(".bab-name").unbind().on("click", function () {
                        expandBab($(this));
                    });
                    $(".edit-question").off("click").on("click", function () {
                        $(".edit-question").off("click");
                        editQuestion($(this));
                    });
                }
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function expandCourse(divCourseName) {
    divCourseName.parent().find("*").each(function (i, obj) {
        if ($(obj).attr("class") == 'bab-name-ctr') {
            $(obj).find("*").each(function (i, obj) {
                if ($(obj).attr("class") == 'bab-name') {
                    if ($(obj).css("height") == '0px') {
                        $(obj).animate({'height': '50px'}, 300, 'linear');
                        $(obj).css("margin-top", "10px");
                    } else {
                        var obj2 = $(obj).parent().find(".question-content-ctr").find(".question-content");
                        obj2.animate({'height': '0'}, 300, 'linear', function () {
                            obj2.css("margin-top", "0");
                        });
                        $(obj).animate({'height': '0'}, 300, 'linear', function () {
                            $(obj).css("margin-top", "0");
                        });
                    }
                    return false;
                }
            });
        }
    });
}

function expandBab(divBabName) {
    divBabName.parent().find("*").each(function (i, obj) {
        if ($(obj).attr("class") == 'question-content-ctr') {
            var obj2 = $(obj);
            $(obj).find("*").each(function (i, obj) {
                if ($(obj).attr("class") == 'question-content') {
                    if ($(obj).css("height") == '0px') {
                        $(obj).animate({'height': '50px'}, 300, 'linear');
                        $(obj).css("margin-top", "10px");
                    } else {
                        $(obj).animate({'height': '0'}, 300, 'linear', function () {
                            $(obj).css("margin-top", "0");
                        });
                    }
                    return false;
                }
            });
        }
    });
}

function editQuestion(btnEditQuestion) {
    pictureFile = null;
    videoFile = null;
    audioFile = null;
    $("#edit-question-a-check").on({
        mouseenter: function () {
            $("#edit-question-a-check-active").css("display", "block");
        },
        mouseleave: function () {
            $("#edit-question-a-check-active").css("display", "none");
        }
    });
    $("#edit-question-a-check").on("click", function () {
        $("#edit-question-a-check").unbind("mouseenter mouseleave");
        $("#edit-question-a-check-active").css("display", "block");
        $("#edit-question-b-check-active").css("display", "none");
        $("#edit-question-c-check-active").css("display", "none");
        $("#edit-question-d-check-active").css("display", "none");
        correctAnswer = 0;
    });
    $("#edit-question-b-check").on({
        mouseenter: function () {
            $("#edit-question-b-check-active").css("display", "block");
        },
        mouseleave: function () {
            $("#edit-question-b-check-active").css("display", "none");
        }
    });
    $("#edit-question-b-check").on("click", function () {
        $("#edit-question-b-check").unbind("mouseenter mouseleave");
        $("#edit-question-a-check-active").css("display", "none");
        $("#edit-question-b-check-active").css("display", "block");
        $("#edit-question-c-check-active").css("display", "none");
        $("#edit-question-d-check-active").css("display", "none");
        correctAnswer = 1;
    });
    $("#edit-question-c-check").on({
        mouseenter: function () {
            $("#edit-question-c-check-active").css("display", "block");
        },
        mouseleave: function () {
            $("#edit-question-c-check-active").css("display", "none");
        }
    });
    $("#edit-question-c-check").on("click", function () {
        $("#edit-question-c-check").unbind("mouseenter mouseleave");
        $("#edit-question-a-check-active").css("display", "none");
        $("#edit-question-b-check-active").css("display", "none");
        $("#edit-question-c-check-active").css("display", "block");
        $("#edit-question-d-check-active").css("display", "none");
        correctAnswer = 2;
    });
    $("#edit-question-d-check").on({
        mouseenter: function () {
            $("#edit-question-d-check-active").css("display", "block");
        },
        mouseleave: function () {
            $("#edit-question-d-check-active").css("display", "none");
        }
    });
    $("#edit-question-d-check").on("click", function () {
        $("#edit-question-d-check").unbind("mouseenter mouseleave");
        $("#edit-question-a-check-active").css("display", "none");
        $("#edit-question-b-check-active").css("display", "none");
        $("#edit-question-c-check-active").css("display", "none");
        $("#edit-question-d-check-active").css("display", "block");
        correctAnswer = 3;
    });
    var id = $(btnEditQuestion).attr("id");
    var a = id.indexOf("course-") + 7;
    var b = id.indexOf("-bab-", a);
    courseIndex = id.substr(a, b - a);
    a = b + 5;
    b = id.indexOf("-question-", a);
    babIndex = id.substr(a, b - a);
    a = b + 10;
    b = id.length;
    var questionIndex = id.substr(a, b - a);
    questionIndex = questionIndex.trim();
    currentQuestion = questionIndex;
    var courses = coursesJSON;
    var question = courses[courseIndex].bab[babIndex].questions[questionIndex].question;
    currentEdittedQuestion = question;
    var answers = courses[courseIndex].bab[babIndex].questions[questionIndex].answers;
    var type = courses[courseIndex].bab[babIndex].questions[questionIndex].type;
    correctAnswer = parseInt(courses[courseIndex].bab[babIndex].questions[questionIndex].correct_answer);
    var pictureURL = courses[courseIndex].bab[babIndex].questions[questionIndex].picture_url;
    var videoURL = courses[courseIndex].bab[babIndex].questions[questionIndex].video_url;
    var audioURL = courses[courseIndex].bab[babIndex].questions[questionIndex].audio_url;
    if (pictureURL != '') {
        $("#edit-question-img").css("backgroundImage", "url('" + pictureURL + "')");
        editQuestionMediaData = "noupdate"; //"noupdate" means, the current picture of question will not be replaced
    } else {
        $("#edit-question-img").css("backgroundImage", "url('img/bab-placeholder.jpg')");
    }
    if (videoURL != '') {
        $("#edit-question-video-source").attr("src", videoURL);
        $("#edit-question-video")[0].load();
    } else {
        $("#edit-question-video-source").attr("src", "");
        $("#edit-question-video")[0].load();
    }
    if (audioURL != '') {
        $("#edit-question-audio-source").attr("src", audioURL);
        $("#edit-question-audio")[0].load();
    } else {
        $("#edit-question-audio-source").attr("src", "");
        $("#edit-question-audio")[0].load();
    }
    $("#edit-question-reason").val(courses[courseIndex].bab[babIndex].questions[questionIndex].reason);
    $("#edit-question-content").val(question);
    if (type == 'pilihan') {
        questionType = 0;
        $("#edit-question-choose-question-type").html("Pilihan");
        var splittedAnswer = answers.split("@");
        var answerA = splittedAnswer[0];
        var answerB = splittedAnswer[1];
        var answerC = splittedAnswer[2];
        var answerD = splittedAnswer[3];
        $("#edit-question-answer-a").val(answerA);
        $("#edit-question-answer-b").val(answerB);
        $("#edit-question-answer-c").val(answerC);
        $("#edit-question-answer-d").val(answerD);
        if (correctAnswer == 0) {
            $("#edit-question-a-check-active").css("display", "block");
            $("#edit-question-b-check-active").css("display", "none");
            $("#edit-question-c-check-active").css("display", "none");
            $("#edit-question-d-check-active").css("display", "none");
        } else if (correctAnswer == 1) {
            $("#edit-question-a-check-active").css("display", "none");
            $("#edit-question-b-check-active").css("display", "block");
            $("#edit-question-c-check-active").css("display", "none");
            $("#edit-question-d-check-active").css("display", "none");
        } else if (correctAnswer == 2) {
            $("#edit-question-a-check-active").css("display", "none");
            $("#edit-question-b-check-active").css("display", "none");
            $("#edit-question-c-check-active").css("display", "block");
            $("#edit-question-d-check-active").css("display", "none");
        } else if (correctAnswer == 3) {
            $("#edit-question-a-check-active").css("display", "none");
            $("#edit-question-b-check-active").css("display", "none");
            $("#edit-question-c-check-active").css("display", "none");
            $("#edit-question-d-check-active").css("display", "block");
        }
    } else if (type == 'isian') {
        questionType = 1;
        $("#edit-question-choose-question-type").html("Isian");
        var isianA = answers;
        $("#edit-question-isian-a").val(isianA);
        $("#edit-question-pilihan-answers").css("display", "none");
        $("#edit-question-isian-answers").css("display", "block");
    }
    $("#edit-question-dialog-ctr").css("display", "flex");
    $("#edit-question-dialog-ctr").hide();
    $("#edit-question-dialog-ctr").fadeIn(200);
    $("#edit-question-save").on("click", function () {
        $("#edit-question-save").off("click");
        var imgFileName = "";
        var videoFileName = "";
        var audioFileName = "";
        if (pictureFile != null) {
            imgFileName = guid();
            pictureURL = "http://ilatih.com/backend/userdata/imgs/"+imgFileName;
        }
        if (videoFile != null) {
            videoFileName = guid();
            videoURL = "http://ilatih.com/backend/userdata/videos/"+videoFileName;
        }
        if (audioFile != null) {
            audioFileName = guid();
            audioURL = "http://ilatih.com/backend/userdata/audios/"+audioFileName;
        }
        if (imgFileName != '') {
            var fd4 = new FormData();
            fd4.append("img_file_name", imgFileName);
            fd4.append("img_file", pictureFile);
            $.ajax({
                type: 'POST',
                url: PHP_URL + 'upload-img-2.php',
                data: fd4,
                processData: false,
                contentType: false,
                cache: false,
                success: function (a) {
                    pictureFile = null;
                }
            });
        }
        if (videoFileName != '') {
            var fd4 = new FormData();
            fd4.append("video_file_name", videoFileName);
            fd4.append("video_file", pictureFile);
            $.ajax({
                type: 'POST',
                url: PHP_URL + 'upload-video.php',
                data: fd4,
                processData: false,
                contentType: false,
                cache: false,
                success: function (a) {
                    videoFile = null;
                }
            });
        }
        if (audioFileName != '') {
            var fd4 = new FormData();
            fd4.append("audio_file_name", audioFileName);
            fd4.append("audio_file", pictureFile);
            $.ajax({
                type: 'POST',
                url: PHP_URL + 'upload-audio.php',
                data: fd4,
                processData: false,
                contentType: false,
                cache: false,
                success: function (a) {
                    alert("Audio file name: "+a);
                    audioFile = null;
                }
            });
        }
        var fd = new FormData();
        fd.append("question", $("#edit-question-content").val());
        if (questionType == 0) {
            answerA = $("#edit-question-answer-a").val();
            answerB = $("#edit-question-answer-b").val();
            answerC = $("#edit-question-answer-c").val();
            answerD = $("#edit-question-answer-d").val();
            answers = answerA + "@" + answerB + "@" + answerC + "@" + answerD;
        } else {
            answers = $("#edit-question-isian-a").val();
        }
        var reason = $("#edit-question-reason").val();
        fd.append("answers", answers);
        fd.append("correct_answer", correctAnswer);
        fd.append("question_id", courses[courseIndex].bab[babIndex].questions[questionIndex].id);
        fd.append("picture_url", pictureURL);
        fd.append("video_url", videoURL);
        fd.append("audio_url", audioURL);
        fd.append("reason", reason);
        $.ajax({
            type: 'POST',
            url: PHP_URL + 'update-question.php',
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            success: function (a) {
                if (a == 0) {
                    cancelEditingQuestion();
                    document.getElementById("edit-question-img").src = "img/no-img.png";
                    document.getElementById("edit-question-video").src = "";
                    pictureFile = null;
                    mediaType = "";
                    editQuestionMediaData = "";
                    $(".edit-question").off("click");
                    getQuestions();
                } else {
                    alert("Gagal menyimpan soal, error code: " + a);
                }
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function cancelEditingQuestion() {
    $("#edit-question-dialog-ctr").css("display", "none");
    $("#edit-question-content").val("");
    $("#edit-question-answer-a").val("");
    $("#edit-question-answer-b").val("");
    $("#edit-question-answer-c").val("");
    $("#edit-question-answer-d").val("");
    $("#edit-question-answer-e").val("");
    $("#edit-question-a-check-active").css("display", "none");
    $("#edit-question-b-check-active").css("display", "none");
    $("#edit-question-c-check-active").css("display", "none");
    $("#edit-question-d-check-active").css("display", "none");
    $(".edit-question").off("click").on("click", function () {
        $(".edit-question").off("click");
        editQuestion($(this));
    });
}

function loadCoursesIntoShowCoursesOption() {
    courseIndex = -1;
    babImgURL = "";
    courseName = "";
    $.ajax({
        type: 'GET',
        dataType: 'text',
        url: PHP_URL + 'get-courses.php',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var courses = JSON.parse(a);
                for (var i = 0; i < courses.length; i++) {
                    var course = courses[i];
                    addCourseToShowCoursesOption(course.name, course.lecturer);
                }
                $(".show-courses-item").on("click", function () {
                    courseIndex = $(this).index();
                    courseName = courses[courseIndex].name;
                    $("#choose-course").html(courseName);
                });
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
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
        url: PHP_URL + 'get-courses.php',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var courses = JSON.parse(a);
                for (var i = 0; i < courses.length; i++) {
                    var course = courses[i];
                    addCourse2(course.name, course.lecturer);
                }
                $(".show-courses-item").on("click", function () {
                    courseIndex = $(this).index();
                    courseName = courses[courseIndex].name;
                    $("#add-question-choose-course").html(courseName);
                    loadBabs(courseName);
                });
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function cancelAddingQuestion() {
    $("#add-question-dialog-ctr").css("display", "none");
    $("#fill-question-dialog-ctr").css("display", "none");
    babIndex = -1;
    babName = "";
    correctAnswer = -1;
    $("#add-question-choose-course").html("Pilih mata kuliah");
    $("#add-question-choose-bab").html("Pilih bab");
    $("#question-types").css("display", "none");
}

function addQuestion() {
    $("#add-question-dialog").css("height", "225px");
    $("#add-question-error").css("display", "none");
    $("#fill-question-img").css("background-image", "url('img/no-img.png')");
    $("#fill-question-video-source").attr("src", "");
    $("#fill-question-video")[0].load();
    $("#fill-question-audio-source").attr("src", "");
    $("#fill-question-audio")[0].load();
    $("#add-question-reason").val("");
    $("#choose-question-type").html("Pilih Tipe soal");
    $("#answer-a").val("");
    $("#answer-b").val("");
    $("#answer-c").val("");
    $("#answer-d").val("");
    $("#isian-a").val("");
    $("#add-question-content").val("");
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
    //$("#add-question-dialog-ctr").css("display", "none");
    $("#add-question-dialog-ctr").fadeOut(300);
    $("#fill-question-dialog-ctr").css("display", "flex");
    $("#fill-question-dialog-ctr").hide();
    $("#fill-question-dialog-ctr").fadeIn(300);
    $("#fill-question-error").html("");
    $("#add-question-reason").val("");
    $("#fill-question-error").css("display", "none");
    $("#fill-question-dialog").css("height", "500px");
    $("#a-check-active").css("display", "none");
    $("#b-check-active").css("display", "none");
    $("#c-check-active").css("display", "none");
    $("#d-check-active").css("display", "none");
    $("#isian-a").val("");
    questionType = -1;
    correctAnswer = -1;
    imageSize = 0;
    audioSize = 0;
    videoSize = 0;
    imageData = "";
    audioData = "";
    videoData = "";
    $("#fill-question-img").css("backgroundImage", "http://ilatih.com/backend/img/bab-placeholder.jpg");
    $("#fill-question-video-source").attr("src", "");
    $("#fill-question-video")[0].load();
    $("#fill-question-audio-source").attr("src", "");
    $("#fill-question-audio")[0].load();
    $("#add-question-content").val("");
    $("#answer-a").val("");
    $("#answer-b").val("");
    $("#answer-c").val("");
    $("#answer-d").val("");
}

/*function saveEdittedQuestion() {
    $("#edit-question-dialog").css("height", "500px");
    $("#edit-question-error").html("");
    $("#edit-question-error").css("display", "none");
    var question = $("#edit-question-content").val();
    if (question == '') {
        $("#edit-question-dialog").css("height", "530px");
        $("#edit-question-error").html("Mohon isi soal sebelum melanjutkan");
        $("#edit-question-error").css("display", "block");
        return;
    }
    var answers = "";
    if (questionType == -1) {
        $("#edit-question-dialog").css("height", "530px");
        $("#edit-question-error").html("Mohon pilih tipe soal");
        $("#edit-question-error").css("display", "block");
        return;
    }
    if (questionType == 0) {
        var answerA = $("#edit-question-answer-a").val();
        var answerB = $("#edit-question-answer-b").val();
        var answerC = $("#edit-question-answer-c").val();
        var answerD = $("#edit-question-answer-d").val();
        if (answerA == '' || answerB == '' || answerC == '' || answerD == '') {
            $("#edit-question-dialog").css("height", "530px");
            $("#edit-question-error").html("Mohon isi semua pilihan jawaban");
            $("#edit-question-error").css("display", "block");
            return;
        }
        if (answerA.indexOf("@") !== -1
            || answerB.indexOf("@") !== -1
            || answerC.indexOf("@") !== -1
            || answerD.indexOf("@") !== -1) {
            $("#edit-question-dialog").css("height", "530px");
            $("#edit-question-error").html("Mohon untuk tidak mengisi pilihan jawaban dengan karakter '@'");
            $("#edit-question-error").css("display", "block");
            return;
        }
        if (correctAnswer == -1) {
            $("#edit-question-dialog").css("height", "530px");
            $("#edit-question-error").html("Mohon pilih jawaban yang benar");
            $("#edit-question-error").css("display", "block");
            return;
        }
        answers += answerA;
        answers += "@";
        answers += answerB;
        answers += "@";
        answers += answerC;
        answers += "@";
        answers += answerD;
    } else if (questionType == 1) {
        var isianA = $("#edit-question-isian-a").val();
        if (isianA == '') {
            $("#edit-question-error").html("Mohon isi jawaban untuk pengoreksian");
            $("#edit-question-dialog").css("height", "530px");
            $("#edit-question-error").css("display", "block");
            return;
        }
        answers += (isianA);
        correctAnswer = 0;
    }
    $("#loading-message").html("Menyimpan soal...<br/>Mohon untuk tidak menutup Tab ini.");
    $("#loading-container").css("display", "flex");
    var imageID = guid();
    var videoID = guid();
    var audioID = guid();
    var imageURL = "";
    var videoURL = "";
    var audioURL = "";
    if (imageData != '') {
        imageURL = "http://ilatih.com/backend/userdata/imgs/" + imageID;
        var fd2 = new FormData();
        fd2.append("id", imageID);
        fd2.append("img_data", imageData);
        $.ajax({
            type: 'POST',
            url: PHP_URL + 'upload-img-with-id.php',
            data: fd2,
            processData: false,
            contentType: false,
            cache: false,
            success: function (a) {
                if (imageSize > audioSize && imageSize > videoSize) {
                    $("#loading-container").css("display", "none");
                }
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    }
    if (videoData != '') {
        videoURL = "http://ilatih.com/backend/userdata/videos/" + videoID;
        var fd3 = new FormData();
        fd3.append("id", videoID);
        fd3.append("video_data", videoData);
        $.ajax({
            type: 'POST',
            url: PHP_URL + 'upload-video-with-id.php',
            processData: false,
            contentType: false,
            data: fd3,
            cache: false,
            success: function (a) {
                if (videoSize > imageSize && videoSize > audioSize) {
                    $("#loading-container").css("display", "none");
                }
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    }
    if (audioData != '') {
        audioURL = "http://ilatih.com/backend/userdata/audios/" + audioID;
        var fd4 = new FormData();
        fd4.append("id", audioID);
        fd4.append("audio_data", audioData);
        $.ajax({
            type: 'POST',
            url: PHP_URL + 'upload-audio-with-id.php',
            processData: false,
            contentType: false,
            data: fd4,
            cache: false,
            success: function (a) {
                if (audioSize > imageSize && audioSize > videoSize) {
                    $("#loading-container").css("display", "none");
                }
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    }
    var fd = new FormData();
    var courses = coursesJSON;
    var questionId = courses[courseIndex].bab[babIndex].questions[currentQuestion].id;
    var courseId = courses[courseIndex].bab[babIndex].questions[currentQuestion].course_id;
    var babId = courses[courseIndex].bab[babIndex].questions[currentQuestion].bab_id;
    fd.append("question_id", questionId);
    fd.append("question", question);
    fd.append("course_id", courseId);
    fd.append("bab_id", babId);
    fd.append("answers", answers);
    fd.append("correct_answer", correctAnswer);
    fd.append("image_url", imageURL);
    fd.append("video_url", videoURL);
    fd.append("audio_url", audioURL);
    if (questionType == 0) {
        fd.append("type", "pilihan");
    } else if (questionType == 1) {
        fd.append("type", "isian");
    }
    $.ajax({
        type: 'POST',
        url: PHP_URL + 'save-editted-question.php',
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function (a) {
            $("#edit-question-dialog-ctr").css("display", "none");
            getQuestions();
            correctAnswer = -1;
            if (imageData == '' && videoData == '' && audioData == '') {
                $("#loading-container").css("display", "none");
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}*/

function fillQuestion() {
    $("#fill-question-dialog").css("height", "500px");
    $("#fill-question-error").html("");
    $("#fill-question-error").css("display", "none");
    var question = $("#add-question-content").val();
    if (question == '') {
        $("#fill-question-dialog").css("height", "530px");
        $("#fill-question-error").html("Mohon isi soal sebelum melanjutkan");
        $("#fill-question-error").css("display", "block");
        return;
    }
    var answers = "";
    if (questionType == -1) {
        $("#fill-question-dialog").css("height", "530px");
        $("#fill-question-error").html("Mohon pilih tipe soal");
        $("#fill-question-error").css("display", "block");
        return;
    }
    var reason = $("#add-question-reason").val();
    if (reason == '') {
        $("#fill-question-dialog").css("height", "530px");
        $("#fill-question-error").html("Mohon masukkan alasan");
        $("#fill-question-error").css("display", "block");
        return;
    }
    if (questionType == 0) {
        var answerA = $("#answer-a").val();
        var answerB = $("#answer-b").val();
        var answerC = $("#answer-c").val();
        var answerD = $("#answer-d").val();
        if (answerA == '' || answerB == '' || answerC == '' || answerD == '') {
            $("#fill-question-dialog").css("height", "530px");
            $("#fill-question-error").html("Mohon isi semua pilihan jawaban");
            $("#fill-question-error").css("display", "block");
            return;
        }
        if (answerA.indexOf("@") !== -1
            || answerB.indexOf("@") !== -1
            || answerC.indexOf("@") !== -1
            || answerD.indexOf("@") !== -1) {
            $("#fill-question-dialog").css("height", "530px");
            $("#fill-question-error").html("Mohon untuk tidak mengisi pilihan jawaban dengan karakter '@'");
            $("#fill-question-error").css("display", "block");
            return;
        }
        if (correctAnswer == -1) {
            $("#fill-question-dialog").css("height", "530px");
            $("#fill-question-error").html("Mohon pilih jawaban yang benar");
            $("#fill-question-error").css("display", "block");
            return;
        }
        answers += answerA;
        answers += "@";
        answers += answerB;
        answers += "@";
        answers += answerC;
        answers += "@";
        answers += answerD;
    } else if (questionType == 1) {
        var isianA = $("#isian-a").val();
        if (isianA == '') {
            $("#fill-question-error").html("Mohon isi jawaban untuk pengoreksian");
            $("#fill-question-dialog").css("height", "530px");
            $("#fill-question-error").css("display", "block");
            return;
        }
        answers += (isianA);
        correctAnswer = 0;
    }
    $("#loading-message").html("Menyimpan soal...<br/>Mohon untuk tidak menutup Tab ini.");
    $("#loading-container").css("display", "flex");
    var imageID = guid();
    var videoID = guid();
    var audioID = guid();
    var imageURL = "";
    var videoURL = "";
    var audioURL = "";
    if (imageData != '') {
        imageURL = "http://ilatih.com/backend/userdata/imgs/" + imageID;
        var fd2 = new FormData();
        fd2.append("id", imageID);
        fd2.append("img_file", fillQuestionImageFile);
        $.ajax({
            type: 'POST',
            url: PHP_URL + 'upload-img-with-id.php',
            data: fd2,
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
            cache: false,
            success: function (a) {
                console.log(a);
                //if (imageSize > audioSize && imageSize > videoSize) {
                $("#loading-container").css("display", "none");
                //}
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    }
    if (videoData != '') {
        videoURL = "http://ilatih.com/backend/userdata/videos/" + videoID;
        var fd3 = new FormData();
        fd3.append("id", videoID);
        fd3.append("video_data", videoData);
        $.ajax({
            type: 'POST',
            url: PHP_URL + 'upload-video-with-id.php',
            processData: false,
            contentType: false,
            data: fd3,
            cache: false,
            success: function (a) {
                //if (videoSize > imageSize && videoSize > audioSize) {
                $("#loading-container").css("display", "none");
                //}
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    }
    if (audioData != '') {
        audioURL = "http://ilatih.com/backend/userdata/audios/" + audioID;
        var fd4 = new FormData();
        fd4.append("id", audioID);
        fd4.append("audio_data", audioData);
        $.ajax({
            type: 'POST',
            url: PHP_URL + 'upload-audio-with-id.php',
            processData: false,
            contentType: false,
            data: fd4,
            cache: false,
            success: function (a) {
                //if (audioSize > imageSize && audioSize > videoSize) {
                $("#loading-container").css("display", "none");
                //}
            },
            error: function (a, b, c) {
                alert(b + ' ' + c);
            }
        });
    }
    var fd = new FormData();
    fd.append("question", question);
    fd.append("course_name", courseName);
    fd.append("bab_name", babName);
    fd.append("answers", answers);
    fd.append("correct_answer", correctAnswer);
    fd.append("reason", reason);
    fd.append("image_url", imageURL);
    fd.append("video_url", videoURL);
    fd.append("audio_url", audioURL);
    if (questionType == 0) {
        fd.append("type", "pilihan");
    } else if (questionType == 1) {
        fd.append("type", "isian");
    }
    $.ajax({
        type: 'POST',
        data: fd,
        url: PHP_URL + 'add-question.php',
        processData: false,
        contentType: false,
        cache: false,
        success: function (a) {
            $("#fill-question-dialog-ctr").css("display", "none");
            getQuestions();
            correctAnswer = -1;
            if (imageData == '' && videoData == '' && audioData == '') {
                $("#loading-container").css("display", "none");
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function loadBabs(courseName) {
    if (courseName == '') {
        return;
    }
    $("#add-question-babs").find("*").remove();
    $("#add-question-choose-bab").html("Pilih bab");
    babIndex = -1;
    babName = "";
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'get-bab.php',
        dataType: 'text',
        data: {'course_name': courseName},
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var babs = JSON.parse(a);
                for (var i = 0; i < babs.length; i++) {
                    var bab = babs[i];
                    var div = document.createElement("li");
                    div.setAttribute("class", "list-item show-babs-item");
                    div.setAttribute("style", "cursor: pointer;");
                    var img = document.createElement("img");
                    if (bab.img_url == '') {
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
                $(".show-babs-item").on("click", function () {
                    babIndex = $(this).index();
                    babName = babs[babIndex].name;
                    $("#add-question-choose-bab").html(babName);
                });
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
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
    $("#add-bab-dialog").css("height", "360px");
    $("#add-bab-error").css("display", "none");
    var name = $("#bab-name").val();
    if (name == '') {
        $("#add-bab-dialog").css("height", "390px");
        $("#add-bab-error").html("Mohon masukkan nama bab");
        $("#add-bab-error").css("display", "block");
        return;
    }
    var accessCode = $("#access-code").val();
    if (accessCode == "") {
        $("#add-bab-dialog").css("height", "390px");
        $("#add-bab-error").html("Mohon masukkan kode akses");
        $("#add-bab-error").css("display", "block");
        return;
    }
    if (courseIndex == -1) {
        $("#add-bab-dialog").css("height", "390px");
        $("#add-bab-error").html("Mohon pilih mata kuliah");
        $("#add-bab-error").css("display", "block");
        return;
    }
    var timeLimit = $("#add-bab-time-limit").val();
    if (timeLimit == '') {
        $("#add-bab-dialog").css("height", "390px");
        $("#add-bab-error").html("Mohon isi lama waktu");
        $("#add-bab-error").css("display", "block");
        return;
    }
    timeLimit = parseInt(timeLimit.trim());
    if (timeLimit < 5) {
        $("#add-bab-dialog").css("height", "390px");
        $("#add-bab-error").html("Mohon isi lama waktu minimal 5 menit");
        $("#add-bab-error").css("display", "block");
        return;
    }
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'add-bab.php',
        data: {'name': name, 'course_name': courseName, 'access-code': accessCode, 'img_url': babImgURL, 'time-limit': timeLimit},
        dataType: 'text',
        success: function (a) {
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
                $("#add-bab-dialog").css("height", "390px");
                $("#add-bab-error").css("display", "block");
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function addBab(name0, questionsCount, imgURL) {
    var div = document.createElement("div");
    div.setAttribute("class", "bab-item");
    div.setAttribute("style", "position: relative;");
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
    desc.innerHTML = "" + questionsCount + " soal";
    desc.setAttribute("style", "font-size: 10px; color: #888888; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;");
    var menuContainer = document.createElement("div");
    menuContainer.setAttribute("style", "width: 100%; height: 100%; display: flex; justify-content: flex-end; align-items: flex-end; position: absolute; left: 0; top: 0;");
    var menu = document.createElement("div");
    menu.setAttribute("class", "menu");
    menu.setAttribute("style", "width: 30px; height: 50px; red; display: flex; justify-content: center; align-items: center;");
    var menuImg = document.createElement("img");
    menuImg.setAttribute("src", "img/menu.png");
    menuImg.setAttribute("width", "3px");
    menuImg.setAttribute("height", "15px");
    menu.appendChild(menuImg);
    menuContainer.appendChild(menu);
    var dialog = document.createElement("div");
    dialog.setAttribute("class", "bab-dialog");
    dialog.setAttribute("style", "display: none; position: absolute; right: 0; bottom: -80px; background-color: white; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4); color: black; font-size: 20px;");
    var edit = document.createElement("div");
    edit.setAttribute("class", "bab-dialog-edit bab-dialog-item");
    edit.setAttribute("style", "margin-top: 10px;");
    edit.innerHTML = "Edit";
    var remove = document.createElement("div");
    remove.setAttribute("class", "bab-dialog-remove bab-dialog-item");
    remove.setAttribute("style", "margin-bottom: 10px;");
    remove.innerHTML = "Hapus";
    dialog.appendChild(edit);
    dialog.appendChild(remove);
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(desc);
    div.appendChild(menuContainer);
    div.appendChild(dialog);
    document.getElementById("babs").appendChild(div);
    getDaftarBab();
}

function getDaftarBab() {
    $("#babs").find("*").remove();
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'get-all-babs.php',
        dataType: 'text',
        cache: false,
        async: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var jsonData = JSON.parse(a);
                var items = "";
                $("#babs").find("*").remove();
                for (var i = 0; i < jsonData.length; i++) {
                    var bab = jsonData[i];
                    var div = document.createElement("div");
                    div.setAttribute("class", "bab-item");
                    div.setAttribute("style", "position: relative;");
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
                        url: PHP_URL + "get-soal-by-bab.php",
                        data: {'bab_id': bab.id},
                        dataType: 'text',
                        cache: false,
                        success: function (a) {
                            if (a < 0) {
                                desc.innerHTML = "0 soal";
                                return;
                            }
                            var questionsCount = JSON.parse(a).length;
                            desc.innerHTML = "" + questionsCount + " soal";
                        },
                        error: function (a, b, c) {
                            alert(b + ' ' + c);
                        }
                    });
                    desc.setAttribute("style", "font-size: 10px; color: #888888; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;");
                    var menuContainer = document.createElement("div");
                    menuContainer.setAttribute("style", "width: 100%; height: 100%; display: flex; justify-content: flex-end; align-items: flex-end; position: absolute; left: 0; top: 0;");
                    var menu = document.createElement("div");
                    menu.setAttribute("class", "menu");
                    menu.setAttribute("style", "width: 30px; height: 50px; red; display: flex; justify-content: center; align-items: center;");
                    var menuImg = document.createElement("img");
                    menuImg.setAttribute("src", "img/menu.png");
                    menuImg.setAttribute("width", "3px");
                    menuImg.setAttribute("height", "15px");
                    menu.appendChild(menuImg);
                    menuContainer.appendChild(menu);
                    var dialog = document.createElement("div");
                    dialog.setAttribute("class", "bab-dialog");
                    dialog.setAttribute("style", "display: none; position: absolute; right: 0; bottom: -80px; background-color: white; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4); color: black; font-size: 20px;");
                    var edit = document.createElement("div");
                    edit.setAttribute("class", "bab-dialog-edit bab-dialog-item");
                    edit.setAttribute("style", "margin-top: 10px;");
                    edit.innerHTML = "Edit";
                    var remove = document.createElement("div");
                    remove.setAttribute("class", "bab-dialog-remove bab-dialog-item");
                    remove.setAttribute("style", "margin-bottom: 10px;");
                    remove.innerHTML = "Hapus";
                    dialog.appendChild(edit);
                    dialog.appendChild(remove);
                    div.appendChild(img);
                    div.appendChild(name);
                    div.appendChild(desc);
                    div.appendChild(menuContainer);
                    div.appendChild(dialog);
                    document.getElementById("babs").appendChild(div);
                    items += ("" +
                        "<div class='bab-item'>" +
                        "<div>" + bab.name + "</div>" +
                        "</div>" +
                        "");
                }
                $(".menu").on("click", function () {
                    var babItem = $(this).parent().parent();
                    var dialog = babItem.find(".bab-dialog");
                    if (dialog.css("display") == "none") {
                        dialog.css("display", "block");
                    } else {
                        dialog.css("display", "none");
                    }
                });
                $(".bab-dialog-edit").on("click", function () {
                    var babItem = $(this).parent().parent();
                    var chapters = babItem.parent();
                    var index = chapters.children().index(babItem);
                    $("#edit-bab-name").val(jsonData[index]["name"]);
                    $("#edit-bab-time-limit").val(jsonData[index]["time_limit"]);
                    $("#edit-bab-access-code").val(jsonData[index]["access_code"]);
                    $("#edit-bab-container").css("display", "block");
                    $("#edit-bab-save").on("click", function () {
                        var babName = $("#edit-bab-name").val();
                        if (babName == '') {
                            return;
                        }
                        var accessCode = $("#edit-bab-access-code").val();
                        if (accessCode == '') {
                            return;
                        }
                        var timeLimit = $("#edit-bab-time-limit").val();
                        if (timeLimit == '') {
                            return;
                        }
                        timeLimit = parseInt(timeLimit);
                        $.ajax({
                            type: 'GET',
                            url: PHP_URL + 'edit-bab.php',
                            data: {'id': jsonData[index]["id"], "name": babName, "access_code": accessCode, "time-limit": timeLimit},
                            dataType: 'text',
                            cache: false,
                            success: function (a) {
                                $("#edit-bab-container").css("display", "none");
                                getDaftarBab();
                            },
                            error: function (a, b, c) {
                            }
                        });
                    });
                    $("#edit-bab-cancel").on("click", function () {
                        $("#edit-bab-container").css("display", "none");
                    });
                });
                $(".bab-dialog-remove").on("click", function () {
                    var babItem = $(this).parent().parent();
                    var chapters = babItem.parent();
                    var index = chapters.children().index(babItem);
                    $("#prompt-title").html("Hapus Bab");
                    $("#prompt-text").html("Apakah Anda yakin ingin menghapus bab ini?");
                    $("#prompt").css("display", "block");
                    $("#prompt-yes").on("click", function () {
                        $.ajax({
                            type: 'GET',
                            url: PHP_URL + 'remove-bab.php',
                            data: {'id': jsonData[index]["id"]},
                            dataType: 'text',
                            cache: false,
                            success: function (a) {
                                $("#prompt").css("display", "none");
                                getDaftarBab();
                            }
                        });
                    });
                    $("#prompt-no").on("click", function () {
                        $("#prompt").css("display", "none");
                    });
                });
            }
        },
        error: function (a, b, c) {
            alert("Error loading daftar bab " + b + ' ' + c);
        }
    });
}

function setDeleteAllCoursesListener() {
    $("#delete-course-btn").on("click", function () {
        deleteCourses();
    });
}

function deleteCourses() {
    var checkBox = $(".check-all").parent().find("input");
    var checked = checkBox.prop("checked");
    if (checked) {
        // Delete all courses
        $("#prompt-yes").html("YA");
        $("#prompt-no").html("TIDAK");
        $("#prompt-no").css("display", "block");
        $("#prompt-text").html("Apakah Anda yakin ingin menghapus semua mata kuliah ini?");
        $("#prompt-title").html("Hapus Mata Kuliah");
        //$("#prompt").css("display", "block");
        $("#prompt").fadeIn(200);
        $("#prompt-yes").on("click", function () {
            $("#courses").find("tbody").find("*").remove();
            $("#prompt").css("display", "none");
            $(".check-all").parent().find("input").prop("checked", false);
            $(".check-all").css("opacity", "0");
            uncheckAllCourses();
            $("#delete-course-btn").css("display", "none");
        });
        $("#prompt-no").on("click", function () {
            $("#prompt").css("display", "none");
            $("#prompt").css("display", "none");
        });
    } else {
        $("#prompt-yes").html("YA");
        $("#prompt-no").html("TIDAK");
        $("#prompt-no").css("display", "block");
        $("#prompt-text").html("Apakah Anda yakin ingin menghapus mata kuliah ini?");
        $("#prompt-title").html("Hapus Mata Kuliah");
        //$("#prompt").css("display", "block");
        $("#prompt").fadeIn(200);
        $("#prompt-yes").on("click", function () {
            // Get all checked items
            var index = 0;
            var totalChecked = 0;
            $("#courses").find("tbody").find("*").each(function () {
                if ($(this).prop("tagName") == "INPUT") {
                    var inputIndex = index;
                    var checked = $(this).prop("checked");
                    if (checked) {
                        $.ajax({
                            type: 'GET',
                            dataType: 'text',
                            url: PHP_URL + 'delete-course.php',
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
    }
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
            $("#delete-course-btn").css("display", "block");
        } else {
            $(this).css("opacity", "0");
            uncheckAllCourses();
            $("#delete-course-btn").css("display", "none");
        }
        event.stopPropagation();
    });
}

function deleteCourseFromList(index) {
    $("#courses").find("tbody").find("tr:eq(" + index + ")").remove();
}

function setItemCheckBoxListener() {
    $("#courses").find("tbody").find("*").each(function () {
        if ($(this).attr("class") == "check-img") {
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
                    if ($(this).prop("tagName") == "INPUT") {
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
        if ($(this).prop("tagName") == "INPUT") {
            var checkBox = $(this);
            checkBox.prop("checked", true);
            checkBox.parent().find("div:eq(1)").css("opacity", "1");
        }
    });
}

function uncheckAllCourses() {
    $("#courses").find("tbody").find("*").each(function () {
        if ($(this).prop("tagName") == "INPUT") {
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
        url: PHP_URL + 'get-courses.php',
        success: function (response) {
            console.log(response);
            var courses = JSON.parse(response);
            coursesJSON = courses;
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
                    "<td><a class='edit-course link' style='cursor: pointer;'>Edit</a></td>" +
                    "<td><a class='delete-course link' style='cursor: pointer;'>Hapus</a></td>" +
                    "" + "</tr>");
            }
            $("#courses").find("tbody").append(items);
            setDeleteAllCoursesListener();
            setDeleteCourseListener();
            setEditCourseListener();
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
    /*var regex = new RegExp("^[a-zA-Z]+$");
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
    }*/
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
        url: PHP_URL + 'check-course-availability.php',
        data: {'name': courseName},
        cache: false,
        success: function (r) {
            if (r == 0) {
                // Course not available
                $.ajax({
                    type: 'GET',
                    dataType: 'text',
                    url: PHP_URL + 'add-course.php',
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
                        setDeleteAllCoursesListener();
                        setDeleteCourseListener();
                        setEditCourseListener();
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
    //$('#dialog').css('display', 'block');
    $("#dialog").fadeIn(200);
}

function cancelAddingCourse() {
    $('#course-name').val("");
    $('#dialog').css('display', 'none');
    $('#add-course-dialog').css('height', '240px');
}

function setEditCourseListener() {
    $(".edit-course").on("click", function (a) {
        var tr = $(this).parent().parent();
        var table = tr.parent();
        var index = table.children().index(tr);
        edittedCourseID = coursesJSON[index]["id"];
        $("#edit-course-name").val(coursesJSON[index]["name"]);
        $("#edit-course-lecturer").val(coursesJSON[index]["lecturer"]);
        $('#edit-course-container').css("display", "flex");
    });
}

function setDeleteCourseListener() {
    $(".delete-course").on("click", function () {
        var deleteCourseLink = $(this);
        var courseName = deleteCourseLink.closest("tr").find("td:eq(1)").html();
        $("#prompt-title").html("Hapus Mata Kuliah");
        $("#prompt-text").html("Apakah Anda yakin ingin menghapus mata kuliah ini?");
        $("#prompt-no").html("BATAL");
        $("#prompt-yes").html("HAPUS");
        $("#prompt-no").css("display", "block");
        //$("#prompt").css("display", "block");
        $("#prompt").fadeIn(200);
        $("#prompt-no").on("click", function () {
            $("#prompt").css("display", "none");
        });
        $("#prompt-yes").on("click", function () {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: PHP_URL + 'delete-course.php',
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
        url: PHP_URL + 'save-courses.php',
        data: {'filename': 'courses.json'},
        cache: false,
        success: function (a) {
            /*var win = window.open("download-file.php?filename=courses.json&download_file_name=matakuliah.json", "_blank");
            win.focus();*/
            $("#save-courses")[0].click();
        },
        error: function (a, b, c) {
            error(b + ' ' + c);
        }
    });
}

function clearCourses() {
    $("#courses").find("tbody").find("*").remove();
}

function uploadCourses() {
    $("#open-upload-dialog").on("change", function () {
        var fr = new FileReader();
        fr.onload = function () {
            var jsonData = fr.result;
            $.ajax({
                url: PHP_URL + 'restore-courses.php',
                type: 'POST',
                dataType: 'text',
                data: {'data': jsonData},
                success: function (a) {
                    clearCourses();
                    var json = JSON.parse(jsonData);
                    for (var i = 0; i < json.length; i++) {
                        addNewCourseToList(json[i].name, json[i].lecturer);
                    }
                    setDeleteAllCoursesListener();
                    setDeleteCourseListener();
                    setEditCourseListener();
                },
                error: function (a, b, c) {
                    alert(b + ' ' + c);
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

function showQuestionTypeOptions() {
    if ($("#question-types").css("display") == "none") {
        $("#question-types").css("display", "block");
    } else {
        $("#question-types").css("display", "none");
    }
}

function showEditQuestionTypeOptions() {
    if ($("#edit-question-types").css("display") == "none") {
        $("#edit-question-types").css("display", "block");
    } else {
        $("#edit-question-types").css("display", "none");
    }
}

function selectQuestionType(obj) {
    var index = $(".question-type-item").index($(obj));
    if (index == 0) { // Pilihan
        $("#pilihan-answers").css("display", "block");
        $("#isian-answers").css("display", "none");
        $("#fill-question-dialog").css("height", "500px");
        $("#choose-question-type").html("Pilihan");
    } else if (index == 1) { // Isian
        $("#isian-answers").css("display", "block");
        $("#pilihan-answers").css("display", "none");
        $("#fill-question-dialog").css("height", "500px");
        $("#choose-question-type").html("Isian");
    }
    questionType = index;
    $("#question-types").css("display", "none");
    $("#fill-question-error").css("display", "none");
}

function selectEditQuestionType(type) {
    if (type == 0) { // Pilihan
        $("#edit-question-pilihan-answers").css("display", "block");
        $("#edit-question-isian-answers").css("display", "none");
        $("#edit-question-dialog").css("height", "500px");
        $("#edit-question-choose-question-type").html("Pilihan");
    } else if (type == 1) { // Isian
        $("#edit-question-isian-answers").css("display", "block");
        $("#edit-question-pilihan-answers").css("display", "none");
        $("#edit-question-dialog").css("height", "460px");
        $("#edit-question-choose-question-type").html("Isian");
    }
    questionType = type;
    $("#edit-question-types").css("display", "none");
    $("#edit-question-error").css("display", "none");
}

function selectImage() {
    $("#fill-question-select-img").on("change", function () {
        $("#fill-question-select-img").off("change");
        fillQuestionImageFile = $(this).prop("files")[0];
        var size = $(this).prop("files")[0].size;
        if (size > 2 * 1024 * 1024) {
            alert("File gambar tidak boleh lebih dari 2 MB");
            return;
        }
        imageSize = size;
        var fr = new FileReader();
        fr.onload = function () {
            imageData = fr.result;
            $("#fill-question-img").css("backgroundImage", "url('" + fr.result + "')");
        };
        fr.readAsDataURL($(this).prop("files")[0]);
    });
    $("#fill-question-select-img").click();
}

function editQuestionSelectImage() {
    $("#edit-question-select-img").on("change", function () {
        $("#edit-question-select-img").off("change");
        var size = $(this).prop("files")[0].size;
        if (size > 2 * 1024 * 1024) {
            alert("File gambar tidak boleh lebih dari 2 MB");
            return;
        }
        imageSize = size;
        var fr = new FileReader();
        fr.onload = function () {
            imageData = fr.result;
            $("#edit-question-img").css("backgroundImage", "url('" + fr.result + "')");
        };
        fr.readAsDataURL($(this).prop("files")[0]);
        pictureFile = $(this).prop("files")[0];
    });
    $("#edit-question-select-img").click();
}

function selectVideo() {
    $("#fill-question-select-video").on("change", function () {
        $("#fill-question-select-video").off("change");
        var size = $(this).prop("files")[0].size;
        if (size > 100 * 1024 * 1024) {
            alert("File video tidak boleh lebih dari 100 MB");
            return;
        }
        videoSize = size;
        var fr = new FileReader();
        fr.onload = function () {
            videoData = fr.result;
            $("#fill-question-video-source").attr("src", videoData);
            $("#fill-question-video")[0].load();
        };
        fr.readAsDataURL($(this).prop("files")[0]);
    });
    $("#fill-question-select-video").click();
}

function editQuestionSelectVideo() {
    $("#edit-question-select-video").on("change", function () {
        $("#edit-question-select-video").off("change");
        var size = $(this).prop("files")[0].size;
        if (size > 100 * 1024 * 1024) {
            alert("File video tidak boleh lebih dari 100 MB");
            return;
        }
        videoSize = size;
        var fr = new FileReader();
        fr.onload = function () {
            videoData = fr.result;
            $("#edit-question-video-source").attr("src", fr.result);
            $("#edit-question-video")[0].load();
        };
        fr.readAsDataURL($(this).prop("files")[0]);
        videoFile = $(this).prop("files")[0];
    });
    $("#edit-question-select-video").click();
}

function selectAudio() {
    $("#fill-question-select-audio").on("change", function () {
        $("#fill-question-select-audio").off("change");
        var size = $(this).prop("files")[0].size;
        if (size > 50 * 1024 * 1024) {
            alert("File audio tidak boleh lebih dari 50 MB");
            return;
        }
        audioSize = size;
        var fr = new FileReader();
        fr.onload = function () {
            audioData = fr.result;
            $("#fill-question-audio-source").attr("src", audioData);
            $("#fill-question-audio")[0].load();
        };
        fr.readAsDataURL($(this).prop("files")[0]);
    });
    $("#fill-question-select-audio").click();
}

function editQuestionSelectAudio() {
    $("#edit-question-select-audio").on("change", function () {
        $("#edit-question-select-audio").off("change");
        var size = $(this).prop("files")[0].size;
        if (size > 50 * 1024 * 1024) {
            alert("File audio tidak boleh lebih dari 50 MB");
            return;
        }
        audioSize = size;
        var fr = new FileReader();
        fr.onload = function () {
            audioData = fr.result;
            $("#edit-question-audio-source").attr("src", fr.result);
            $("#edit-question-audio")[0].load();
        };
        fr.readAsDataURL($(this).prop("files")[0]);
        audioFile = $(this).prop("files")[0];
    });
    $("#edit-question-select-audio").click();
}

function saveEdittedCourse() {
    $("#edit-course-error").css("display", "none");
    var name = $("#edit-course-name").val();
    var lecturer = $("#edit-course-lecturer").val();
    if (name == '' || lecturer == '') {
        $("#edit-course-error").html("Masukkan nama atau nama pembimbing");
        $("#edit-course-error").css("display", "block");
        return;
    }
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'edit-course.php',
        data: {'id': edittedCourseID, 'name': name, 'lecturer': lecturer},
        dataType: 'text',
        cache: false,
        success: function (a) {
            $("#edit-course-container").css("display", "none");
            getCourses();
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function deleteQuestion() {
    var courses = coursesJSON;
    var questionId = courses[courseIndex].bab[babIndex].questions[currentQuestion].id;
    $.ajax({
        type: 'GET',
        url: PHP_URL + 'delete-question.php',
        data: {'id': questionId},
        dataType: 'text',
        success: function (a) {
            $("#edit-question-dialog-ctr").css("display", "none");
            getQuestions();
        }
    });
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}