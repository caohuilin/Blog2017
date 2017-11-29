# Linux内核编译

Linux内核是操作系统的核心，也是操作系统最基本的部分。
Linux内核的体积结构是单内核的、但是他充分采用了微内核的设计思想、使得虽然是单内核、但工作在模块化的方式下、并且这个模块可以动态装载或卸载；Linux负责管理系统的进程、内存、设备驱动程序、文件和网络系统，决定着系统的性能和稳定性。如是我们在了解Linux内核的基础上根据自己的需要、量身定制一个更高效，更稳定的内核，就需要我们手动去编译和配置内核里的各项相关的参数和信息了。

## 一、编译内核的基本步骤

### 1.获取内核源码，解压到/user/src

```bash
# tar xvf linux-3.13.5.tar.xz
# ln -sv /usr/src/linux-3.13.5 /usr/src/linux
```

### 2.配置内核特性(选择一种方法就可以了)

```bash
//遍历选择所要编译的内核特性
# make config
//配置所有可编译的内核特性
# make allyesconfig
//并不是所有的都不编译
# make allnoconfig
//这种就是打开一个文件窗口选择菜单
# make menuconfig
//KDE桌面环境下，并且安装了qt开发环境
# make kconfig
//Gnome桌面环境，并且安装gtk开发环境
# make gconfig
```

### 3.编译内核

```bash
# make [-j #]
//#号最多为CPU物理核心总数的两倍，这样会快点哦
```

### 4.安装内核模块

```bash
# make modules_install
```

### 5.安装内核

```bash
# make install
```

### 6.验证并测试

```bash
# cat /boot/grub/grub.conf
```

查看新内核是否已经添加，然后重启系统并测试

## 二、生成makefile文件

以计算斐波那契序列的程序为例

### 1.写main.c,fib.c.fib.h文件如下

main.c

```c
#include<stdio.h>
#include"fib.h"
int main(){
    int n=0;
    printf(“input n=\n”);
    scanf("%d",&n);
    printf("fib(%d)=%dn",n,fib(n));
    return 0;
}
```

fib.h

```h
int fib(int n);
```

fib.c

```c
#include"fib.h"
int  fib(int  n){
   If(n == 0)
      return 0;
   if(n == 1||n == 2){
       return 1;
   return fib(n-i) + fib(n-2);
}
```

### 2.需要安装automake和autoconf两个命令

 ```bash
# sudo apt-get install autoconf

```

### 3.进入源文件目录

```bash
# autoscan
```

这时会在目录下生成两个文件 autoscan.log 和 configure.scan
将configure.Scan改名为configure.ac。
同时用gedit打开（下面的文件内容是已经修改过内容以后的，对比修改）

```ac
-----------------------------configure.ac文件开始-----------------------------------------
#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.
AC_PREREQ([2.64])
AC_INIT(first, 1.0, XXXX@XXX.com)
AC_INIT([FULL-PACKAGE-NAME], [VERSION], [BUG-REPORT-ADDRESS])
AC_CONFIG_SRCDIR([first.c])
AC_CONFIG_HEADERS([config.h])
AM_INIT_AUTOMAKE(first,1.0)
# Checks for programs.
AC_PROG_CC
# Checks for libraries.
# Checks for header files.
# Checks for typedefs, structures, and compiler characteristics.
# Checks for library functions.
AC_OUTPUT(Makefile)
-----------------------------configure.ac文件结束-----------------------------------------
```

### 4.新建文件Makefile.am，内容如下：

```am
AUTOMAKE_OPTIONS=foreign
bin_PROGRAMS=first
first_SOURCES=first.c
```

### 5.运行命令aclocal

```bash
# aclocal
```

成功之后，会在目录下产生 aclocal.m4 和 autom4te.cache 两个文件。

### 6.运行命令autoheader

```bash
# autoheader
```

成功之后，会在目录下产生 config.h.in 这个新文件。

### 7.运行命令autoconf

```bash
# autoconf
```
成功之后，会在目录下产生 configure 这个新文件。

### 8.运行命令automake --add-missing

```bash
# automake --add-missing
```
输出结果为：

```bash
configure.in:8: installing './install-sh'
configure.in:8: installing './missing'
Makefile.am: installing './depcomp'
```

成功之后，会在目录下产生 depcomp，install-sh 和 missing 这三个新文件和Makefile.in文件。

### 9.运行命令./configure

```bash
# ./configure
```
即可自动生成makefile

## 三、添加内核模块（首先写好模块(hello.c文件)

### 1.建立

```bash
# sudo make-C/lilb/modules/$(uname  -r)/build M=$(pwb)
```

### 2.加入模块

```bash
# sudo insmod ./hello.ko
```

### 3.移除模块
```bash
# sudo rmmod hello
```
附：打开一个命令行（ctrl+alt+t） 查看模块添加情况
```bash
# tail/var/log/kern.log
```
