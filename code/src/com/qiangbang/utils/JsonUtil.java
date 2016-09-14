/**   
* @Title: JsonUtil.java 
* @Package com.qiangbang.utils 
* @Description: TODO 
* @author leroy(32504251@qq.com)   
* @date 2016年5月15日 下午4:28:14 
* @version V1.0   
*/ 
package com.qiangbang.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.TextNode;

/** 
  * @ClassName: JsonUtil 
  * @Description: TODO 
  * @author leroy(32504251@qq.com) 
  * @date 2016年5月15日 下午4:28:14 
  *  
  */
public class JsonUtil {
    public static String objectToJson(Object object)throws JsonProcessingException {  
        ObjectMapper mapper = new ObjectMapper();  
        return mapper.writeValueAsString(object);  
    }
    
    
    public static ObjectMapper getObjectMapper() {
    	ObjectMapper om = new ObjectMapper();
        return om;
      }
    
    public static Map<?, ?> parseJson(String jsonString){
      JsonNode jn = null;
      try {
        jn = getObjectMapper().readTree(jsonString);
      } catch (IOException ex) {
        ex.printStackTrace();
      }
      return (Map<?, ?>)JsonNodeToMap(jn);
    }
   
    public static Object parseJson2MapOrList(String jsonString)
    {
      JsonNode jn = null;
      try {
        jn = getObjectMapper().readTree(jsonString);
      } catch (IOException ex) {
        ex.printStackTrace();
      }
      return JsonNodeToMap(jn);
    }
   
    public static <T> T parseJson(String jsonString, Class<T> classType)
    {
      try {
        return getObjectMapper().readValue(jsonString, classType);
      } catch (Exception ex) {
        ex.printStackTrace();
      }return null;
    }
   
    public static <T> T parseJson(String jsonString, TypeReference<T> typeReference)
    {
      try
      {
        return getObjectMapper().readValue(jsonString, typeReference);
      } catch (Exception ex) {
        ex.printStackTrace();
      }return null;
    }
   
    public static <T> T parseJsonT(String jsonString)
    {
      try
      {
        return getObjectMapper().readValue(jsonString, new TypeReference<Object>() { } );
      }
      catch (Exception ex) {
        ex.printStackTrace();
      }return null;
    }
   
    public static <T> Map<?, ?> bean2Map(Object bean)
    {
      try
      {
        return (Map<?, ?>)getObjectMapper().convertValue(bean, Map.class);
      } catch (Exception ex) {
        ex.printStackTrace();
      }return null;
    }
   
    public static <T> T map2Bean(Map<?, ?> map, Class<T> clazz)
    {
      try
      {
        return getObjectMapper().convertValue(map, clazz);
      } catch (Exception ex) {
        ex.printStackTrace();
      }return null;
    }
   
    public static Object JsonNodeToMap(JsonNode root){
      Map<String, Object> map = new LinkedHashMap<String, Object>();
      if (root == null) {
        return map;
      }
      if (root.isArray()) {
        List<Object> list = new ArrayList<Object>();
        for (JsonNode node : root) {
          Object nmp = JsonNodeToMap(node);
          list.add(nmp);
        }
        return list;
      }if (root.isTextual()) {
        try {
          return ((TextNode)root).asText();
        } catch (Exception e) {
          return root.toString();
        }
      }

      Iterator<?> iter = root.fields();
      while (iter.hasNext()) {
        @SuppressWarnings("rawtypes")
      Map.Entry entry = (Map.Entry)iter.next();
        String key = (String)entry.getKey();
        JsonNode ele = (JsonNode)entry.getValue();
        if (ele.isObject())
          map.put(key, JsonNodeToMap(ele));
        else if (ele.isTextual())
          map.put(key, ((TextNode)ele).asText());
        else if (ele.isArray())
          map.put(key, JsonNodeToMap(ele));
        else {
          map.put(key, ele.toString());
        }
      }
      return map;
    }
}
