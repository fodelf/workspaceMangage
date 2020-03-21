/*
 * @Description: 接口列表
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-11-25 10:32:46
 * @LastEditors: 吴文周
 * @LastEditTime: 2019-11-26 09:24:40
 */
<% _.forEach(attrs, function(attr) { %>
// <%- attr.desc %>
export interface <%- attr.ClassName %> {
  <% _.forEach(attr.parameters, function(attrChild) { %><%- attrChild.name %><%- attrChild.required?'':"?" %>:<%- attrChild.type %>// <%- attrChild.description %>
  <%})%>
}
<% })%>