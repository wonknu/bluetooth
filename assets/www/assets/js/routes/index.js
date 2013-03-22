var Router = Router || {};

Router.index = function (containers, cb)
{
    $.ajax({ url : 'templates/common/header.html' }) // LOAD HEADER
    .fail(function(jqXHR, textStatus, errorThrown) {})
    .done(function(data, textStatus, jqXHR)
    {
        var template = Handlebars.compile( data );
        $(containers.header).html(template({
            title : 'Header!',
            nav: [
                { url: "#", title: "nav 1" },
                { url: "#", title: "nav 2" }
            ]
        }));
    })
    .always(function() // THEN
    {
        $.ajax({ url : 'templates/common/footer.html' }) // LOAD FOOTER
        .fail(function(jqXHR, textStatus, errorThrown) {})
        .done(function(data, textStatus, jqXHR)
        {
            var template = Handlebars.compile( data );
            $(containers.footer).html(template({title : 'footer!'}));
        })
        .always(function() // THEN
        {
            $.ajax({ url : 'templates/index.html' }) // LOAD INDEX CONTENT
            .fail(function(jqXHR, textStatus, errorThrown) {})
            .done(function(data, textStatus, jqXHR)
            {
                var template = Handlebars.compile( data );
                $(containers.content).html(template({title : 'Welcome!'}));
            })
            .always(function()
            {
                cb(); // WE ARE DONE
            });
        });
    });
    
    return this;
};
