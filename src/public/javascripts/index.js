$(':input').on('focus', function() {
    this.dataset.placeholder = this.placeholder;
    this.placeholder = '';
}).on('blur', function(){
    this.placeholder = this.dataset.placeholder;
});