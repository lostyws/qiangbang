package com.qiangbang.utils;

import java.io.File;  
import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;  
import org.apache.tools.ant.taskdefs.Expand;
import org.apache.tools.ant.taskdefs.Zip;  
import org.apache.tools.ant.types.FileSet;  
/**
 * Apache ant实现文件压缩/解压缩
 */
public class ZipUtil{  
  
    /**
     * zip压缩
     * @param srcPath  要压缩的文件/目录地址
     * @param zipFilepath  压缩包地址
     */
    public static void zip(String srcPath,String zipFilepath) {  
        File file = new File(srcPath);  
        if (!file.exists())  
            throw new RuntimeException(srcPath + "不存在！");  
          
        Project prj = new Project();  
        Zip zip = new Zip(); 
        zip.setEncoding("GBK");
        zip.setProject(prj);  
        zip.setDestFile(new File(zipFilepath));  
        FileSet fileSet = new FileSet();  
        fileSet.setProject(prj);  
        // 判断是目录还是文件
        if (file.isDirectory()) {
        	fileSet.setDir(file);  
        	//fileSet.setIncludes("**/*.java"); 包括哪些文件或文件夹 eg:zip.setIncludes("*.java");  
        	//fileSet.setExcludes(...); 排除哪些文件或文件夹  
        }else{
        	fileSet.setFile(file);
        }
        zip.addFileset(fileSet);  
        zip.execute();  
    }  
    
    /**
     * zip解压
     * @param zipFilepath  压缩包地址
     * @param destDir   解压后的目录地址
     */
    public static void unzip(String zipFilepath, String destDir)throws BuildException, RuntimeException {
     if (!new File(zipFilepath).exists())
         throw new RuntimeException("zip file " + zipFilepath+ " does not exist.");

     Project proj = new Project();
     Expand expand = new Expand();
     expand.setProject(proj);
     expand.setTaskType("unzip");
     expand.setTaskName("unzip");
     //expand.setEncoding(encoding);
     expand.setSrc(new File(zipFilepath));
     expand.setDest(new File(destDir));
     expand.execute();
    }
    
    public static void main(String[] args) {
    	ZipUtil.zip("D:/workspace/文档", "d://word/zip/test.zip");
    	ZipUtil.unzip("d://word/zip/test.zip", "d://word/zip/unzip");
	}
}  
