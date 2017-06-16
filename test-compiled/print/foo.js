// Compiled by ClojureScript 1.9.227 {:target :nodejs}
goog.provide('print.foo');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('cljs.pprint');
print.foo._STAR_print_fn_STAR_ = cljs.pprint.pprint;
print.foo._STAR_enabled_STAR_ = true;
/**
 * Turns any one binding arg (which may be a destructuring binding) into a vector
 *   where the left elem is the arg with a possible :as added to it.
 *   And the rght side is the symbol referring to the arg itself.
 */
print.foo.single_destructuring_arg__GT_form_PLUS_name = (function print$foo$single_destructuring_arg__GT_form_PLUS_name(arg_form){
var as_symbol = cljs.core.gensym.call(null,new cljs.core.Symbol(null,"symbol-for-destructured-arg","symbol-for-destructured-arg",-470881179,null));
var snd_to_last_is_as_QMARK_ = ((function (as_symbol){
return (function (p1__26777_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"as","as",1148689641),cljs.core.second.call(null,cljs.core.reverse.call(null,p1__26777_SHARP_)));
});})(as_symbol))
;
if(cljs.core.truth_((function (){var and__11688__auto__ = cljs.core.vector_QMARK_.call(null,arg_form);
if(and__11688__auto__){
return snd_to_last_is_as_QMARK_.call(null,arg_form);
} else {
return and__11688__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arg_form,cljs.core.last.call(null,arg_form)], null);
} else {
if(cljs.core.vector_QMARK_.call(null,arg_form)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.call(null,cljs.core.conj.call(null,arg_form,new cljs.core.Keyword(null,"as","as",1148689641)),as_symbol),as_symbol], null);
} else {
if((cljs.core.map_QMARK_.call(null,arg_form)) && (cljs.core.contains_QMARK_.call(null,arg_form,new cljs.core.Keyword(null,"as","as",1148689641)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arg_form,new cljs.core.Keyword(null,"as","as",1148689641).cljs$core$IFn$_invoke$arity$1(arg_form)], null);
} else {
if(cljs.core.map_QMARK_.call(null,arg_form)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,arg_form,new cljs.core.Keyword(null,"as","as",1148689641),as_symbol),as_symbol], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [arg_form,arg_form], null);

}
}
}
}
});
print.foo.expand_arg = (function print$foo$expand_arg(arg){
if((arg instanceof cljs.core.Symbol)){
return arg;
} else {
return cljs.core.first.call(null,print.foo.single_destructuring_arg__GT_form_PLUS_name.call(null,arg));
}
});
/**
 * Diagnostic tool for printing the result of evaluating an s-expression.
 * Any initial args over 1, are printed as strings, and generally used as a label.
 */
print.foo.print_and_return = (function print$foo$print_and_return(var_args){
var args__12782__auto__ = [];
var len__12775__auto___26779 = arguments.length;
var i__12776__auto___26780 = (0);
while(true){
if((i__12776__auto___26780 < len__12775__auto___26779)){
args__12782__auto__.push((arguments[i__12776__auto___26780]));

var G__26781 = (i__12776__auto___26780 + (1));
i__12776__auto___26780 = G__26781;
continue;
} else {
}
break;
}

var argseq__12783__auto__ = ((((0) < args__12782__auto__.length))?(new cljs.core.IndexedSeq(args__12782__auto__.slice((0)),(0),null)):null);
return print.foo.print_and_return.cljs$core$IFn$_invoke$arity$variadic(argseq__12783__auto__);
});

print.foo.print_and_return.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
if(cljs.core.truth_(print.foo._STAR_enabled_STAR_)){
if(cljs.core.seq.call(null,cljs.core.butlast.call(null,xs))){
cljs.core.print.call(null,cljs.core.apply.call(null,cljs.core.str,cljs.core.butlast.call(null,xs)));
} else {
}

print.foo._STAR_print_fn_STAR_.call(null,cljs.core.last.call(null,xs));
} else {
}

return cljs.core.last.call(null,xs);
});

print.foo.print_and_return.cljs$lang$maxFixedArity = (0);

print.foo.print_and_return.cljs$lang$applyTo = (function (seq26778){
return print.foo.print_and_return.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq26778));
});

/**
 * Quicker-to-type version of `print-and-return` with " *** " appended to the front
 */
print.foo.tap = cljs.core.partial.call(null,print.foo.print_and_return," *** ");
print.foo.resolves_to_fn_QMARK_ = (function print$foo$resolves_to_fn_QMARK_(x){
return true;
});
if(typeof print.foo.parse_item !== 'undefined'){
} else {
print.foo.parse_item = (function (){var method_table__12625__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__12626__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__12627__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__12628__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__12629__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"print.foo","parse-item"),((function (method_table__12625__auto__,prefer_table__12626__auto__,method_cache__12627__auto__,cached_hierarchy__12628__auto__,hierarchy__12629__auto__){
return (function (x){
if(cljs.core.list_QMARK_.call(null,x)){
return new cljs.core.Keyword(null,"list","list",765357683);
} else {
if(cljs.core.vector_QMARK_.call(null,x)){
return new cljs.core.Keyword(null,"vector","vector",1902966158);
} else {
if(cljs.core.set_QMARK_.call(null,x)){
return new cljs.core.Keyword(null,"set","set",304602554);
} else {
if(cljs.core.map_QMARK_.call(null,x)){
return new cljs.core.Keyword(null,"map","map",1371690461);
} else {
if(((x instanceof cljs.core.Symbol)) && (cljs.core.not.call(null,print.foo.resolves_to_fn_QMARK_.call(null,x)))){
return new cljs.core.Keyword(null,"sym","sym",-1444860305);
} else {
return new cljs.core.Keyword(null,"default","default",-1987822328);

}
}
}
}
}
});})(method_table__12625__auto__,prefer_table__12626__auto__,method_cache__12627__auto__,cached_hierarchy__12628__auto__,hierarchy__12629__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__12629__auto__,method_table__12625__auto__,prefer_table__12626__auto__,method_cache__12627__auto__,cached_hierarchy__12628__auto__));
})();
}
if(typeof print.foo.parse_list !== 'undefined'){
} else {
print.foo.parse_list = (function (){var method_table__12625__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__12626__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__12627__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__12628__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__12629__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"print.foo","parse-list"),((function (method_table__12625__auto__,prefer_table__12626__auto__,method_cache__12627__auto__,cached_hierarchy__12628__auto__,hierarchy__12629__auto__){
return (function (p__26782){
var vec__26783 = p__26782;
var seq__26784 = cljs.core.seq.call(null,vec__26783);
var first__26785 = cljs.core.first.call(null,seq__26784);
var seq__26784__$1 = cljs.core.next.call(null,seq__26784);
var sym = first__26785;
var _ = seq__26784__$1;
return sym;
});})(method_table__12625__auto__,prefer_table__12626__auto__,method_cache__12627__auto__,cached_hierarchy__12628__auto__,hierarchy__12629__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__12629__auto__,method_table__12625__auto__,prefer_table__12626__auto__,method_cache__12627__auto__,cached_hierarchy__12628__auto__));
})();
}
cljs.core._add_method.call(null,print.foo.parse_item,new cljs.core.Keyword(null,"list","list",765357683),(function (lst){
return print.foo.parse_list.call(null,lst);
}));
cljs.core._add_method.call(null,print.foo.parse_item,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (v){
return cljs.core.into.call(null,cljs.core.empty.call(null,v),cljs.core.map.call(null,print.foo.parse_item,v));
}));
cljs.core._add_method.call(null,print.foo.parse_item,new cljs.core.Keyword(null,"set","set",304602554),(function (s){
return cljs.core.into.call(null,cljs.core.empty.call(null,s),cljs.core.map.call(null,print.foo.parse_item,s));
}));
cljs.core._add_method.call(null,print.foo.parse_item,new cljs.core.Keyword(null,"map","map",1371690461),(function (m){
return cljs.core.into.call(null,cljs.core.empty.call(null,m),(function (){var iter__12480__auto__ = (function print$foo$iter__26786(s__26787){
return (new cljs.core.LazySeq(null,(function (){
var s__26787__$1 = s__26787;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__26787__$1);
if(temp__4657__auto__){
var s__26787__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26787__$2)){
var c__12478__auto__ = cljs.core.chunk_first.call(null,s__26787__$2);
var size__12479__auto__ = cljs.core.count.call(null,c__12478__auto__);
var b__26789 = cljs.core.chunk_buffer.call(null,size__12479__auto__);
if((function (){var i__26788 = (0);
while(true){
if((i__26788 < size__12479__auto__)){
var vec__26796 = cljs.core._nth.call(null,c__12478__auto__,i__26788);
var k = cljs.core.nth.call(null,vec__26796,(0),null);
var v = cljs.core.nth.call(null,vec__26796,(1),null);
cljs.core.chunk_append.call(null,b__26789,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [print.foo.parse_item.call(null,k),print.foo.parse_item.call(null,v)], null));

var G__26802 = (i__26788 + (1));
i__26788 = G__26802;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26789),print$foo$iter__26786.call(null,cljs.core.chunk_rest.call(null,s__26787__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26789),null);
}
} else {
var vec__26799 = cljs.core.first.call(null,s__26787__$2);
var k = cljs.core.nth.call(null,vec__26799,(0),null);
var v = cljs.core.nth.call(null,vec__26799,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [print.foo.parse_item.call(null,k),print.foo.parse_item.call(null,v)], null),print$foo$iter__26786.call(null,cljs.core.rest.call(null,s__26787__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__12480__auto__.call(null,m);
})());
}));
cljs.core._add_method.call(null,print.foo.parse_item,new cljs.core.Keyword(null,"sym","sym",-1444860305),(function (s){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print-and-return","print.foo/print-and-return",-439645733,null)),(function (){var x__12534__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),(function (){var x__12534__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY," "),(function (){var x__12534__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})())));
}));
cljs.core._add_method.call(null,print.foo.parse_item,new cljs.core.Keyword(null,"default","default",-1987822328),(function (x){
return x;
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"->","->",-2139605430,null),(function (p__26803){
var vec__26804 = p__26803;
var seq__26805 = cljs.core.seq.call(null,vec__26804);
var first__26806 = cljs.core.first.call(null,seq__26805);
var seq__26805__$1 = cljs.core.next.call(null,seq__26805);
var _ = first__26806;
var args = seq__26805__$1;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print->","print.foo/print->",-1561919828,null)),args)));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"->>","->>",-1874332161,null),(function (p__26807){
var vec__26808 = p__26807;
var seq__26809 = cljs.core.seq.call(null,vec__26808);
var first__26810 = cljs.core.first.call(null,seq__26809);
var seq__26809__$1 = cljs.core.next.call(null,seq__26809);
var _ = first__26810;
var args = seq__26809__$1;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print->>","print.foo/print->>",18105645,null)),args)));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"cond->","cond->",561741875,null),(function (p__26811){
var vec__26812 = p__26811;
var seq__26813 = cljs.core.seq.call(null,vec__26812);
var first__26814 = cljs.core.first.call(null,seq__26813);
var seq__26813__$1 = cljs.core.next.call(null,seq__26813);
var _ = first__26814;
var args = seq__26813__$1;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print-cond->","print.foo/print-cond->",1299792964,null)),args)));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"cond->>","cond->>",348844960,null),(function (p__26815){
var vec__26816 = p__26815;
var seq__26817 = cljs.core.seq.call(null,vec__26816);
var first__26818 = cljs.core.first.call(null,seq__26817);
var seq__26817__$1 = cljs.core.next.call(null,seq__26817);
var _ = first__26818;
var args = seq__26817__$1;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print-cond->>","print.foo/print-cond->>",1988528225,null)),args)));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"let","let",358118826,null),(function (p__26819){
var vec__26820 = p__26819;
var seq__26821 = cljs.core.seq.call(null,vec__26820);
var first__26822 = cljs.core.first.call(null,seq__26821);
var seq__26821__$1 = cljs.core.next.call(null,seq__26821);
var _ = first__26822;
var vec__26823 = seq__26821__$1;
var seq__26824 = cljs.core.seq.call(null,vec__26823);
var first__26825 = cljs.core.first.call(null,seq__26824);
var seq__26824__$1 = cljs.core.next.call(null,seq__26824);
var bindings = first__26825;
var body = seq__26824__$1;
var bdg_names = cljs.core.take_nth.call(null,(2),bindings);
var bdg_vals = cljs.core.take_nth.call(null,(2),cljs.core.rest.call(null,bindings));
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print-let","print.foo/print-let",202687074,null)),(function (){var x__12534__auto__ = cljs.core.vec.call(null,cljs.core.interleave.call(null,bdg_names,cljs.core.map.call(null,print.foo.parse_item,bdg_vals)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),cljs.core.map.call(null,print.foo.parse_item,body))));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"if","if",1181717262,null),(function (p__26826){
var vec__26827 = p__26826;
var seq__26828 = cljs.core.seq.call(null,vec__26827);
var first__26829 = cljs.core.first.call(null,seq__26828);
var seq__26828__$1 = cljs.core.next.call(null,seq__26828);
var _ = first__26829;
var args = seq__26828__$1;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print-if","print.foo/print-if",1068606534,null)),cljs.core.map.call(null,print.foo.parse_item,args))));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"cond","cond",1606708055,null),(function (p__26830){
var vec__26831 = p__26830;
var seq__26832 = cljs.core.seq.call(null,vec__26831);
var first__26833 = cljs.core.first.call(null,seq__26832);
var seq__26832__$1 = cljs.core.next.call(null,seq__26832);
var _ = first__26833;
var args = seq__26832__$1;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","cond","cljs.core/cond",2005388338,null)),cljs.core.map.call(null,print.foo.parse_item,args))));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"defn","defn",-126010802,null),(function (p__26834){
var vec__26835 = p__26834;
var seq__26836 = cljs.core.seq.call(null,vec__26835);
var first__26837 = cljs.core.first.call(null,seq__26836);
var seq__26836__$1 = cljs.core.next.call(null,seq__26836);
var _ = first__26837;
var args = seq__26836__$1;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print-defn","print.foo/print-defn",848552547,null)),args)));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Symbol(null,"defn-","defn-",1097765044,null),(function (p__26838){
var vec__26839 = p__26838;
var seq__26840 = cljs.core.seq.call(null,vec__26839);
var first__26841 = cljs.core.first.call(null,seq__26840);
var seq__26840__$1 = cljs.core.next.call(null,seq__26840);
var _ = first__26841;
var args = seq__26840__$1;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print-defn-","print.foo/print-defn-",1412715370,null)),args)));
}));
cljs.core._add_method.call(null,print.foo.parse_list,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__26842){
var vec__26843 = p__26842;
var seq__26844 = cljs.core.seq.call(null,vec__26843);
var first__26845 = cljs.core.first.call(null,seq__26844);
var seq__26844__$1 = cljs.core.next.call(null,seq__26844);
var sym = first__26845;
var args = seq__26844__$1;
var l = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sym], null),args);
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","print-and-return","print.foo/print-and-return",-439645733,null)),(function (){var x__12534__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),(function (){var x__12534__auto__ = l;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY," "),(function (){var x__12534__auto__ = cljs.core.map.call(null,((function (l,vec__26843,seq__26844,first__26845,seq__26844__$1,sym,args){
return (function (idx,x){
if((idx === (0))){
return x;
} else {
return print.foo.parse_item.call(null,x);
}
});})(l,vec__26843,seq__26844,first__26845,seq__26844__$1,sym,args))
,cljs.core.range.call(null),l);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})())));
}));
print.foo.get_miliseconds = (function print$foo$get_miliseconds(){
return (new Date()).getMilliseconds();
});
print.foo.wrap_middleware_debugging = (function print$foo$wrap_middleware_debugging(handler,middleware_name,p__26847){
var map__26851 = p__26847;
var map__26851__$1 = ((((!((map__26851 == null)))?((((map__26851.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26851.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26851):map__26851);
var get_in = cljs.core.get.call(null,map__26851__$1,new cljs.core.Keyword(null,"get-in","get-in",688791704),cljs.core.PersistentVector.EMPTY);
var summarize_QMARK_ = cljs.core.get.call(null,map__26851__$1,new cljs.core.Keyword(null,"summarize?","summarize?",829177006),true);
var timings_QMARK_ = cljs.core.get.call(null,map__26851__$1,new cljs.core.Keyword(null,"timings?","timings?",-1773054946),false);
return ((function (map__26851,map__26851__$1,get_in,summarize_QMARK_,timings_QMARK_){
return (function (request){
print.foo.print_and_return.call(null,[cljs.core.str("REQUEST - GOING INTO: "),cljs.core.str(middleware_name)].join(''));

print.foo.print_and_return.call(null,cljs.core.get_in.call(null,request,get_in));

var start = print.foo.get_miliseconds.call(null);
var result = handler.call(null,request);
var end = print.foo.get_miliseconds.call(null);
var result__$1 = (function (){var G__26853 = result;
if(cljs.core.truth_(timings_QMARK_)){
return cljs.core.update_in.call(null,G__26853,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("print.foo","timings","print.foo/timings",17857736)], null),((function (G__26853,start,result,end,map__26851,map__26851__$1,get_in,summarize_QMARK_,timings_QMARK_){
return (function (p1__26846_SHARP_){
return cljs.core.conj.call(null,(function (){var or__11700__auto__ = p1__26846_SHARP_;
if(cljs.core.truth_(or__11700__auto__)){
return or__11700__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"middleware","middleware",1462115504),middleware_name,new cljs.core.Keyword(null,"middleware-elapsed","middleware-elapsed",700303951),(end - start)], null));
});})(G__26853,start,result,end,map__26851,map__26851__$1,get_in,summarize_QMARK_,timings_QMARK_))
);
} else {
return G__26853;
}
})();
print.foo.print_and_return.call(null,[cljs.core.str("RESPONSE - COMING OUT OF: "),cljs.core.str(middleware_name)].join(''));

print.foo.print_and_return.call(null,cljs.core.get_in.call(null,result__$1,get_in));

if(cljs.core.truth_((function (){var and__11688__auto__ = timings_QMARK_;
if(cljs.core.truth_(and__11688__auto__)){
return summarize_QMARK_;
} else {
return and__11688__auto__;
}
})())){
print.foo.print_and_return.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"middleware-timings","middleware-timings",1251383063),new cljs.core.Keyword("print.foo","timings","print.foo/timings",17857736).cljs$core$IFn$_invoke$arity$1(result__$1)], null));

return cljs.core.dissoc.call(null,result__$1,new cljs.core.Keyword("print.foo","timings","print.foo/timings",17857736));
} else {
return result__$1;
}
});
;})(map__26851,map__26851__$1,get_in,summarize_QMARK_,timings_QMARK_))
});
print.foo.interleave_middlewares = (function print$foo$interleave_middlewares(handler,middlewares,p__26854){
var map__26873 = p__26854;
var map__26873__$1 = ((((!((map__26873 == null)))?((((map__26873.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26873.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26873):map__26873);
var get_in = cljs.core.get.call(null,map__26873__$1,new cljs.core.Keyword(null,"get-in","get-in",688791704),cljs.core.PersistentVector.EMPTY);
var timings_QMARK_ = cljs.core.get.call(null,map__26873__$1,new cljs.core.Keyword(null,"timings?","timings?",-1773054946),false);
var summarize_QMARK__determinations = cljs.core.conj.call(null,cljs.core.vec.call(null,cljs.core.repeat.call(null,(cljs.core.count.call(null,middlewares) - (1)),false)),true);
var mw_names = cljs.core.map.call(null,cljs.core.str,middlewares);
var logging_mws = (function (){var iter__12480__auto__ = ((function (summarize_QMARK__determinations,mw_names,map__26873,map__26873__$1,get_in,timings_QMARK_){
return (function print$foo$interleave_middlewares_$_iter__26875(s__26876){
return (new cljs.core.LazySeq(null,((function (summarize_QMARK__determinations,mw_names,map__26873,map__26873__$1,get_in,timings_QMARK_){
return (function (){
var s__26876__$1 = s__26876;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__26876__$1);
if(temp__4657__auto__){
var s__26876__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26876__$2)){
var c__12478__auto__ = cljs.core.chunk_first.call(null,s__26876__$2);
var size__12479__auto__ = cljs.core.count.call(null,c__12478__auto__);
var b__26878 = cljs.core.chunk_buffer.call(null,size__12479__auto__);
if((function (){var i__26877 = (0);
while(true){
if((i__26877 < size__12479__auto__)){
var vec__26885 = cljs.core._nth.call(null,c__12478__auto__,i__26877);
var summarize_QMARK_ = cljs.core.nth.call(null,vec__26885,(0),null);
var mw_name = cljs.core.nth.call(null,vec__26885,(1),null);
cljs.core.chunk_append.call(null,b__26878,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","wrap-middleware-debugging","print.foo/wrap-middleware-debugging",-128908014,null)),(function (){var x__12534__auto__ = mw_name;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),(function (){var x__12534__auto__ = cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"summarize?","summarize?",829177006)),(function (){var x__12534__auto__ = summarize_QMARK_;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"get-in","get-in",688791704)),(function (){var x__12534__auto__ = get_in;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"timings?","timings?",-1773054946)),(function (){var x__12534__auto__ = timings_QMARK_;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})()))));

var G__26891 = (i__26877 + (1));
i__26877 = G__26891;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26878),print$foo$interleave_middlewares_$_iter__26875.call(null,cljs.core.chunk_rest.call(null,s__26876__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26878),null);
}
} else {
var vec__26888 = cljs.core.first.call(null,s__26876__$2);
var summarize_QMARK_ = cljs.core.nth.call(null,vec__26888,(0),null);
var mw_name = cljs.core.nth.call(null,vec__26888,(1),null);
return cljs.core.cons.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("print.foo","wrap-middleware-debugging","print.foo/wrap-middleware-debugging",-128908014,null)),(function (){var x__12534__auto__ = mw_name;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),(function (){var x__12534__auto__ = cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"summarize?","summarize?",829177006)),(function (){var x__12534__auto__ = summarize_QMARK_;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"get-in","get-in",688791704)),(function (){var x__12534__auto__ = get_in;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"timings?","timings?",-1773054946)),(function (){var x__12534__auto__ = timings_QMARK_;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})()))),print$foo$interleave_middlewares_$_iter__26875.call(null,cljs.core.rest.call(null,s__26876__$2)));
}
} else {
return null;
}
break;
}
});})(summarize_QMARK__determinations,mw_names,map__26873,map__26873__$1,get_in,timings_QMARK_))
,null,null));
});})(summarize_QMARK__determinations,mw_names,map__26873,map__26873__$1,get_in,timings_QMARK_))
;
return iter__12480__auto__.call(null,cljs.core.map.call(null,cljs.core.list,summarize_QMARK__determinations,mw_names));
})();
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","->","cljs.core/->",1488366311,null)),(function (){var x__12534__auto__ = handler;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__12534__auto__);
})(),cljs.core.interleave.call(null,middlewares,logging_mws))));
});