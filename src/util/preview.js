/**
 * Created by Administrator on 2017/11/2.
 */
export function Printpart(id_str)//id-str 内容中的id
{
  var el = document.getElementById(id_str);
  var iframe = document.createElement('IFRAME');
  var doc = null;
  iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
  document.body.appendChild(iframe);
  doc = iframe.contentWindow.document;
  doc.write('<div>' + el.innerHTML + '</div>');
  doc.close();
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
  if (navigator.userAgent.indexOf("MSIE") > 0)
  {
    document.body.removeChild(iframe);
  }
}
