$(document).ready(() => {

    //Make Delete Request
    $('#btn-delete').on('click', (e) => {
        //e.preventDefault();
        let clientId = $(e.target).attr('data-id');
        //console.log(clientId);

        //Send Ajax Request to Delete the Client
        var ensureRequest = confirm('Are you sure you want to delete this client..?');
        if (!ensureRequest) {
            window.location.href = `/nodeville/get.client/${clientId}`;
        } else {
            $.ajax({
                type: 'DELETE',
                url: `/nodeville/delete.client/${clientId}`,
                success: (client) => {
                    //console.log(client);
                    window.location.href = '/nodeville/get.allclients';
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }
    });

    //Search Client

    //Grab the Input
    let searchField = $('#search');
    searchField.on('keyup', (e) => {
        //Grab the Input Value
        let searchValue = $(e.target).val().toLowerCase();
        //console.log(searchValue);

        let collections = $('.collection-allclients');
        $.each(collections, (i, ul) => {
            let firstList = ul.firstElementChild;
            let fname = firstList.lastElementChild.innerHTML;

            if (fname.toLowerCase().indexOf(searchValue) != -1) {
                ul.parentElement.style.display = "block";
            } else {
                ul.parentElement.style.display = "none";
            }
        });
    });

});