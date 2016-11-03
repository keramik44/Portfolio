$(function() {
    var check_1 = (Math.floor(Math.random() * 9) + 1).toString(),
        check_2 = (Math.floor(Math.random() * 9) + 1).toString(),
        check = check_1 + check_2;

    $('#contactform span.form_check_1').text(check_1);
    $('#contactform span.form_check_2').text(check_2);
    $('#contactform input[name="contact_check_data"]').val(check);

    var sending = false;
    $('#contactform').on('submit', function(e) {
        var $form = $(this), $submit = $('input[type="submit"]', $form);

        e.preventDefault();

        if (sending) {
            return false;
        }

        $('.form-error', $form).remove();

        $('input, textarea', $form).prop('readonly', true);
        $submit.val('Sending…');
        sending = true;

        $.post($form.attr('action'), $form.serialize(), function(data) {
            if (data === 'ok') {
                $form.slideUp('fast', function() {
                    $form.after('<div class="form-success">message has been delivered.</div>');
                });

                return true;
            }

            $form.prepend('<div class="form-error"> Please, make sure that you have completed all fields in form.</div>');
            $('input, textarea', $form).prop('readonly', false);
            $submit.val('Send');
            sending = false;

            return false;
        }, 'text');
    });
});
