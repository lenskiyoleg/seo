$(document).ready(function()
{
    $('.search').keyup(function search()
    {
        var divGlobal = $('.search').val();

        if (divGlobal.length<2)
        {
            $("div[id='Items']").empty(); 
        }
        else
        {
            $.ajax(
            {
                url:'https://api.hh.ru/suggests/vacancy_search_keyword?text='+divGlobal,
                dataType: 'JSONP',
                success:function(html)
                {
                    for (var i=0; i<divGlobal.length; i++)
                    {
                        $("div[id='Items']").empty();
                        for(var  element=0; element<html.items.length; element++)
                        {
                            var div0 = document.getElementById("Items");
                            var div1 = document.createElement('div');
                            var DivContent1 = document.createElement('a');
                            var DivContent2 = document.createElement('a');
                            DivContent1.className = "bold";
                            var txt = html.items[element].text;
                            divGlobal=divGlobal.toLowerCase();
                            if(divGlobal[i]==" ")
                            {
                                if (divGlobal[i-1]==" ")
                                {
                                    $("div[id='Items']").empty();
                                }
                            }
                            for(var i1=0;  i1< divGlobal.length; i1++)
                            {
                                DivContent1.text += txt[i1];
                            }
                            for(var i1=divGlobal.length;  i1< txt.length; i1++)
                            {
                                DivContent2.text += txt[i1];
                            }
                            txt=txt.toLowerCase();

                            if(divGlobal[i]==txt[i])
                            {
                                div0.appendChild(div1);
                                div1.id = element;
                                var div2 = document.getElementById(element);
                                div2.appendChild(DivContent1);
                                div2.appendChild(DivContent2);
                                DivContent2.id = element;
                                DivContent1.id = element;
                            }
                            div1.onclick = function click()
                             {
                                element= event.target.id;       
                                div0 = document.getElementById(element);      
                                divGlobal = div0.textContent;
                                $('.search').val(divGlobal);
                                $("div[id='Items']").empty();
                                search();
                             }

                        }
                    }
                }  
            })
        }
    });
        
});