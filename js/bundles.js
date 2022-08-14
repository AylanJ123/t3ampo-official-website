$("#form").submit(
    function(e) {
        e.preventDefault();
        let selected = $("input[type='radio'][name='b']:checked");
        console.log(selected, selected[0])
    }
)