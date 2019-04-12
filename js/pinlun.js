    $(document).ready(function () {
        //images
        /*$.museum($('.articleCon img'),{
            disable_url_hash : true
        });*/
        var items = [];
        $('.articleCon img').each(function (index) {
            var $img = $(this);
            $img.data('index', index);
            items.push({
                src: $img.attr('src'),
                title: $img.attr('alt') || ' '
            });
        });
        var currentViewer;
        $('.articleCon img').click(function (e) {
            e.preventDefault();
            if ($('.photoviewer-modal').length) {
                currentViewer.close();
                currentViewer = null;
            }
            if (items.length) {
                new PhotoViewer(items, {
                    index: $(this).data('index'),
                    fixedContent: false,
                    callbacks: {
                        opened: function (el) {
                            currentViewer = this;
                        }
                    }
                });
            }
        });
        $(document).keyup(function (event) {
            if (event.keyCode == 27 && currentViewer) {
                currentViewer.close();
                currentViewer = null;
            }
        });
        /*$(document).click(function(event){
            var $target = $(event.target);
            if(currentViewer && !$target.closest('.photoviewer-modal').length){
                currentViewer.isOpened && currentViewer.close();
            }
        });*/
        //code
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
        //navigator
        $('.articleContent>.articleCon.post_content').titleNav();
    });

    function reply(name, cid) {
        $('#pid').val(cid);
        $('#comment').val('回复 @' + name + " ：");
        $('#content').focus();
        //$("#parent_id").val(id);
    };
    $('#ajaxComment').on('submit', function () {
        debugger
        event.preventDefault() //阻止form表单默认提交
        $(this).ajaxSubmit({
            type: "post",
            success: function (data) {
                debugger
                if (data.state == "ok") {
                    location.href = location.href.indexOf("#allComment") > 0 ?
                        location.href :
                        location.href + "#allComment";
                    location.reload()
                } else {
                    alert('评论失败：' + data.message);
                    if (data.errorCode == 9) {
                        location.href = '#(CPATH)/user/login';
                    }
                }
                $('#content').val('');
            },
            error: function () {
                alert("网络错误，请稍后重试");
            }
        });
        return false;
    });